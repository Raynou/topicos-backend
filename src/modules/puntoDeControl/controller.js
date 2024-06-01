const service = require("./service.js");
const { Request, Response } = require("express");
const { NoFieldProvided } = require("../../shared/errors/NoFieldProvided.js");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPuntosDeControl(req, res) {
  try {
    const lecturas = await service.findAllPuntosDeControl();
    res.send(lecturas);
  } catch (error) {
    // TODO: Adjuntar el mensaje de error propagado por la operación get
    res.sendStatus(500);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getPuntoDeControlByID(req, res) {
  const puntoDeControl = await service.findPuntoDeControlById(req.params.id);
  res.send(puntoDeControl);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createPuntoDeControl(req, res) {
  try {
    const body = req.body;
    const fields = [
      "ruta",
      "latitud",
      "longitud",
      "tiempo_esperado",
      "posicion",
      "tipo",
    ];
    fields.forEach((field) => {
      if (!body[field]) {
        throw new NoFieldProvided(field);
      }
    });
    await service.createPuntoDeControl(req.body);
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
async function updatePuntoDeControl(req, res) {
  try {
    await service.updatePuntoDeControl(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 *
 * Body struct:
 * {
 *   id: string
 * }
 */
async function deletePuntoDeControl(req, res) {
  try {
    await service.deletePuntoDeControl(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
}

module.exports = {
  getPuntosDeControl,
  getPuntoDeControlByID,
  createPuntoDeControl,
  updatePuntoDeControl,
  deletePuntoDeControl,
};
