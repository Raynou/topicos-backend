const { Router } = require("@awaitjs/express");
const controller = require("./controller.js");

const router = Router();

router.getAsync("/", controller.getPuntosDeControl);
router.getAsync("/:id", controller.getPuntoDeControlByID);
router.postAsync("/", controller.createPuntoDeControl);
router.putAsync("/", controller.updatePuntoDeControl);
router.deleteAsync("/:id", controller.deletePuntoDeControl);

module.exports = router;
