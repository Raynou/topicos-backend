const { Router } = require("express");
const usuarioRouter = require("../routes/usuario.routes.js");
const lecturaRouter = require('../routes/lectura.routes.js');
const router = Router();

router.use("/v1/lectura", lecturaRouter)

module.exports = router;