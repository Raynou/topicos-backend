const service = require("../services/lectura.service.js");
const { Request, Response } = require("express");
const { NoFieldProvided } = require("../errors/NoFieldProvided.js");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getLectura(req, res) {
  const lecturas = await service.findAllLecturas();
  res.send(lecturas);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getLecturaById(req, res) {
  const lectura = await service.findLecturaById(req.params.id);
  res.send(lectura);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createLectura(req, res) {
  try {
    const body = req.body;
    const fields = ["arduino", "latitud", "longitud", "rotacion", "aceleracion"];
    fields.forEach(field => {
      if(!body[field]) {
        throw new NoFieldProvided(field);
      }
    });
    await service.createLectura(req.body);
    res.sendStatus(201);
  } catch (e) {
    res.status(400);
    res.json({
      error: e.message,
    });
    res.end();
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function test(req, res) {
  console.log("Este wey envió una ruta al controlador de la lectura");
  res.end();
}

module.exports = {
  getLectura,
  getLecturaById,
  createLectura,
  test,
};
