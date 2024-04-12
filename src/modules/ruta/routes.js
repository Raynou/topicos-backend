const { Router } = require("@awaitjs/express");
const controller = require("./controller.js");

const router = Router();

router.getAsync("/", controller.getRutas);
router.getAsync("/:id", controller.getRutaById);
router.postAsync("/", controller.createRuta);
router.putAsync("/", controller.updateRuta);
router.delete("/", controller.deleteRuta);

module.exports = router;
