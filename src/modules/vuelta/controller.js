const { Request, Response } = require("express");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getVueltas(req, res) {
  res.send({
    datos: [
      {
        camion: 1,
        num_vuelta: 1,
        fecha: "2024-05-01",
        tiempo_vuelta: "10:30",
        tiempos: ["10:30", "10:35", "10:40"],
      },
      {
        camion: 2,
        num_vuelta: 1,
        fecha: "2024-05-01",
        tiempo_vuelta: "11:00",
        tiempos: ["11:00", "11:05", "11:10"],
      },
      {
        camion: 1,
        num_vuelta: 2,
        fecha: "2024-05-02",
        tiempo_vuelta: "09:30",
        tiempos: ["09:30", "09:35", "09:40"],
      },
      {
        camion: 2,
        num_vuelta: 2,
        fecha: "2024-05-02",
        tiempo_vuelta: "10:00",
        tiempos: ["10:00", "10:05", "10:10"],
      },
    ],
  });
}

module.exports = {
  getVueltas,
};
