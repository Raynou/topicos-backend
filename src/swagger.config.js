const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TSIN REST API",
    version: "1.0.0",
    description: "API REST para el proyecto de la materia de TSIN",
  },
  servers: [
    {
      url: `${process.env.MAIN_URL || "localhost:3000"}/v1`,
    },
  ],

};

const options = {
  swaggerDefinition,
  apis: ["./docs/**/*.yml"],
};

const swaggerDocument = swaggerJSDoc(options);

module.exports = (app) => {
  app.use("/doc", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
};
