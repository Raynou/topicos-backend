const { Request, Response } = require("express");
const vueltaSertvice = require("./service");
const tiempoService = require("../tiempo/service");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getVueltas(req, res) {
  let resBody = {};
  if (req.query.arduino && req.query.fecha) {
    const id = req.query.arduino;
    const date = req.query.fecha; // Format "YYYY-MM-DD"
    console.log(id, date);
    const laps = await vueltaSertvice.findAllVueltasByArduinoIdAndDate(
      id,
      date
    );
    const buffer = [];
    for(let i = 0; i < laps.length; i++){
      const times = await tiempoService.findTiempoByVueltaId(laps[i].id);
      laps[i].tiempos = [];
      for(let j = 0; j < times.length; j++){
        laps[i].tiempos.push(times[j].tiempo);
      }
      buffer.push(laps[i]);
    }
    // Add buffer to response body
    resBody.datos = buffer;
  } else {
    resBody = await vueltaSertvice.findAllVueltas();
  }
  res.send(resBody);
}

module.exports = {
  getVueltas,
};
