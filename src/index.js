require("dotenv").config();
const express = require("express");
const http = require("http");
const router = require("./routes.js");
const cors = require("cors");
const morgan = require("morgan");
const { WsServer } = require("./ws-server.js");

const app = express();
const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 3000;
const MORGAN_MODE = NODE_ENV === "production" ? "combined" : "dev";
const server = http.createServer(app);

// Handle exceptions
process.on("uncaughtException", (err) => {
  if (err.code === "ECONNREFUSED" && NODE_ENV === "development") {
    console.error("Failed connection to WS Server");
  } else {
    throw err;
  }
});

// Middlewares.
app.use(morgan(MORGAN_MODE));
app.use(express.json());
app.use(cors());
app.use("/", router);

// Create a new ws server
const wsServer = new WsServer(server);
// Manage ws events
wsServer.setup();

// We hide Swagger's doc in production because expose it can incur in
// vulnerabilities
if (NODE_ENV === "development") {
  const initSwagger = require("./swagger.config.js");
  initSwagger(app);
}
server.listen(PORT, () => {
  console.log("App on port 3000");
});
