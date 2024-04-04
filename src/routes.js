const { Router } = require("express");
const lecturaRouter = require("./modules/lectura/lectura.routes");
const rutaRouter = require("./modules/ruta/ruta.routes");
const puntoDeControlRouter = require("./modules/puntoDeControl/puntoDeControl.routes");
const router = Router();

router.use("/v1/lectura", lecturaRouter);
router.use("/v1/ruta", rutaRouter);
router.use("/v1/puntoDeControl", puntoDeControlRouter);

module.exports = router;
