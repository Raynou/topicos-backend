const express = require("express");
const router = require("./routes.js");
const cors = require("cors");
const YAML = require("yamljs");
// const swaggerDocument = YAML.load("./docs/lectura.routes.yml");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const app = express();

// Swagger definition
const swaggerDefinition = {
  info: {
    title: "TSIN REST API",
    version: "1.0.0",
    description: "API REST para el proyecto de la materia de TSIN",
  },
  host: "localhost:3000", 
  basePath: "/v1", 
};

const options = {
  swaggerDefinition,
  apis: ["./docs/**/*.yml"],
};

const swaggerDocument = swaggerJSDoc(options);

// Middleware.
app.use(express.json());
app.use(cors());
app.use("/", router);
app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("App on port 3000");
});
