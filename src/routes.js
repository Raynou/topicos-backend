const { Router } = require("express");
const lecturaRouter = require("./modules/lectura/lectura.routes");
const router = Router();

router.use("/v1/lectura", lecturaRouter)

module.exports = router;