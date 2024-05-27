const pdcService = require("../puntoDeControl/service.js");
const arduinoService = require("../arduino/service.js");
const rutaService = require("../ruta/service.js");
const vueltaService = require("../vuelta/service.js");
const lecturaService = require("../lectura/service.js");

/**
 * Save the times of the buses in the database.
 * @param {Array} ids - The ids of the buses.
 * @param {Array} times - The times of the buses.
 */
const saveTimes = async (ids, times) => {
  for (let i = 0; i < ids.length; i++) {
    const busLastLap = await vueltaService.findLastVueltByArduinoId(ids[i]);
    // Cap the given time in the lap
    const newTime = {
      vuelta: busLastLap.id,
      tiempo: times[i],
      fecha: new Date(),
    };
    tiempoService.createTiempo(newTime);
  }
};

/**
 * Create a new lap in the database for the given arduino.
 * @param {Array} arduino - The id of the arduino.
 */
const createNewLap = async (arduinos) => {
  arduinos.forEach(async (arduino) => {
    const vuelta = {
      arduino: arduino,
      fecha: new Date(),
    };
    await vueltaService.createVuelta(vuelta);
  });
};

/**
 * Setup all of the events for the websocket connection.
 * @param {*} ws - A websocket connection.
 */
const setupWsEvents = (ws) => {
  ws.on("message", async (data) => {
    const message = JSON.parse(data.toString());
    switch (message) {
      case message.type === "checkpoint":
        saveTimes(message.id, message.times);
        break;
      case message.type === "vuelta":
        createNewLap(message.id);
        break;
    }
  });

  /**
   * Get the neccesary data from the database to send it to the desktop app.
   * @returns {Object} The data to send to the desktop app.
   */
  const getData = async () => {
    // TODO: Change the route to a dynamic value
    const route = 1;

    const buses = await arduinoService.findAllArduinos();
    const treeshold = await rutaService.findRutaById(route)?.treeshold ?? 0;
    const checkpoints = await pdcService.findPuntoDeControlByRuta(route);

    if(!buses || !treeshold || !checkpoints) {
      return;
    }

    const allBusesPosition = buses.map(async (bus) => {
      await lecturaService.findAllLecturasByArduinoId(bus.id).pop();
    });

    if(!allBusesPosition) {
      return;
    }

    const data = {
      treeshold: treeshold,
      vehicles: {
        id: buses.map((bus) => bus.id),
        lat: allBusesPosition.map((bus) => bus.latitud),
        lng: allBusesPosition.map((bus) => bus.longitud),
      },
      checkpoints: {
        id: checkpoints.map((checkpoint) => checkpoint.id),
        lat: checkpoints.map((checkpoint) => checkpoint.latitud),
        lng: checkpoints.map((checkpoint) => checkpoint.longitud),
        times: checkpoints.map((checkpoint) => checkpoint.tiempo),
        type: checkpoints.map((checkpoint) => checkpoint.tipo),
      },
    };
    return data;
  };
  /**
   * Send a snapshot of the data to the desktop app every 30 seconds.
   */
  setInterval(async () => {
    const data = await getData();
    if(!data) {
      console.log("No information in the database for the desktop app")
      return;
    }
    ws.send(JSON.stringify(data));
  }, 30000); // 30 seconds
};

module.exports = {
  setupWsEvents,
};
