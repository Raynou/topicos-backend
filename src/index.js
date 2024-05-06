const express = require("express");
const router = require("./routes.js");
const cors = require("cors");
const morgan = require("morgan");

// Handle exceptions
process.on("uncaughtException", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.error("Failed connection to WS Server");
  }
});

const app = express();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const MORGAN_MODE = NODE_ENV === "production" ? "combined" : "dev";

// Middlewares.
app.use(morgan(MORGAN_MODE));
app.use(express.json());
app.use(cors());
app.use("/", router);

// We hide Swagger's doc in production because expose it can incur in
// vulnerabilities
if (NODE_ENV === "development") {
  const initSwagger = require("./swagger.config.js");
  initSwagger(app);
}

app.listen(PORT, () => {
  console.log("App on port 3000");
});
