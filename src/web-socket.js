const WebSocket = require("ws");
const URL = process.env.WS_URL || "ws://localhost:8080";
const socket = new WebSocket(URL); // Create connection with WS Server
module.exports = socket;