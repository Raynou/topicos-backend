const { Router } = require("@awaitjs/express");
const controller = require("./lectura.controller.js");

const router = Router();

router.getAsync("/", controller.getLectura);
router.getAsync("/:id", controller.getLecturaById);
router.getAsync("/test", controller.test);
router.postAsync("/", controller.createLectura);

module.exports = router;