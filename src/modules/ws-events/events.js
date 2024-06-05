const pdcService = require("../puntoDeControl/service.js");
const arduinoService = require("../arduino/service.js");
const rutaService = require("../ruta/service.js");
const vueltaService = require("../vuelta/service.js");
const lecturaService = require("../lectura/service.js");
const tiempoService = require("../tiempo/service.js");

/**
 * Save the times of the buses in the database.
 * @param {Array} ids - The ids of the buses.
 * @param {Array} times - The times of the buses.
 */
const saveTimes = async (ids, times) => {
  for (let i = 0; i < ids.length; i++) {
    const res = await vueltaService.findLastVueltByArduinoId(ids[i]);
    // Preventive case for when there are no laps in the database for this arduino
    if (!res.success) {
      console.error(res.message);
      return;
    }
    const busLastLap = res.data;
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
 * Transform the type of the checkpoint to a number.
 * @param {*} type
 */
const typeToNumber = (type) => {
  const types = {
    INICIO: 0,
    NORMAL: 1,
  };
  return types[type];
};

/**
 * Setup all of the events for the websocket connection.
 * @param {*} ws - A websocket connection.
 */
const setupWsEvents = (ws) => {
  ws.on("message", async (data) => {
    try {
      const message = JSON.parse(data.toString());
      switch (message.type) {
        case "checkpoint":
          saveTimes(message.id, message.times);
          break;
        case "vuelta":
          createNewLap(message.id);
          break;
      }
    } catch (error) {
      console.error(error.message);
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
    const treeshold = (await rutaService.findRutaById(route)).umbral;
    const checkpoints = await pdcService.findPuntoDeControlByRuta(route);

    if (!buses || !treeshold || !checkpoints) {
      return;
    }

    const allBusesPosition = [];

    for (let i = 0; i < buses.length; i++) {
      const id = buses[i].id;
      const res = await lecturaService.findAllLecturasByArduinoId(id);
      allBusesPosition.push(res.pop());
    }

    if (!allBusesPosition) {
      return;
    }

    const data = {
      treeshold: treeshold,
      vehicles: {
        id: buses.map((bus) => bus.id),
        lat: allBusesPosition.map((bus) => Number(bus.latitud)),
        lng: allBusesPosition.map((bus) => Number(bus.longitud)),
      },
      checkpoints: {
        id: checkpoints.map((checkpoint) => checkpoint.id),
        lat: checkpoints.map((checkpoint) => Number(checkpoint.latitud)),
        lng: checkpoints.map((checkpoint) => Number(checkpoint.longitud)),
        times: checkpoints.map((checkpoint) => Number(checkpoint.tiempo_esperado)),
        type: checkpoints.map((checkpoint) => typeToNumber(checkpoint.tipo)),
      },
    };
    return data;
  };
  /**
   * Send a snapshot of the data to the desktop app every 30 seconds.
   */
  if (process.env.SEND_SNAPSHOT === "true") {
    const time = 30000;
    setInterval(async () => {
      const data = await getData();
      ws.send(JSON.stringify(data));
    }, time);
  }
};

module.exports = {
  setupWsEvents,
};
