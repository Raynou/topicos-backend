const { Router } = require("@awaitjs/express");
const controller = require("./controller.js");

const router = Router();

router.getAsync("/", controller.getVueltas);
module.exports = router;