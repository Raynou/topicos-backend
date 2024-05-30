const service = require("./service.js");
const { Request, Response } = require("express");
const { NoFieldProvided } = require("../../shared/errors/NoFieldProvided.js");

/**
 * @param {Request} req
 * @param {Response} res
 */
async function getRutas(req, res) {
  try {
    const rutas = await service.findAllRutas();
    res.send(rutas);
  } catch (error) {
    // TODO: conseguir hacer la distinción entre un 400 y un 500
    res.status(500);
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
async function getRutaById(req, res) {
  const ruta = await service.findRutaById(req.params.id);
  res.send(ruta);
}

/**
 * @param {Request} req
 * @param {Response} res
 */
async function createRuta(req, res) {
  try {
    const body = req.body;
    const fields = ["nombre", "umbral"];
    fields.forEach((field) => {
      if (!body[field]) {
        throw new NoFieldProvided(field);
      }
    });
    const id = await service.createRuta(req.body);
    res.status(201).json({ id: id }).end();
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
async function updateRuta(req, res) {
  try {
    await service.updateRuta(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
}

/**
 * @param {Request} req
 * @param {Response} res
 *
 */
async function deleteRuta(req, res) {
  try {
    await service.deleteRuta(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res
      .json({
        error: error.message,
      })
      .status(400)
      .end();
  }
}

module.exports = {
  getRutas,
  getRutaById,
  createRuta,
  updateRuta,
  deleteRuta,
};
