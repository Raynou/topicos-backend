const service = require("./service.js");
const { Request, Response } = require("express");
const { NoFieldProvided } = require("../../shared/errors/NoFieldProvided.js");

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
  try {
    const lectura = await service.findLecturaById(req.params.id);
    res.send(lectura);
  } catch (error) {
    res.status(404);
    res.json({
      mensaje: error.message,
    });
    res.end();
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createLectura(req, res) {
  try {
    const body = req.body;
    const fields = [
      "arduino",
      "latitud",
      "longitud" /*, "rotacion", "aceleracion"*/,
    ];
    fields.forEach((field) => {
      if (!body[field]) {
        throw new NoFieldProvided(field);
      }
    });
    const id = await service.createLectura(req.body);
    res.status(201);
    res.json({
      id: id,
    });
    res.end();
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
  console.log("Test req in Lectura's controller");
  await service.testService();
  res.end();
}

module.exports = {
  getLectura,
  getLecturaById,
  createLectura,
  test,
};
