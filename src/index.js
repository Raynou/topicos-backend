const express = require("express");
const router = require("./routes.js");
const cors = require("cors");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/lectura.routes.yml");
const swaggerUI = require("swagger-ui-express");

const app = express();

// Middleware.
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("App on port 3000");
});
