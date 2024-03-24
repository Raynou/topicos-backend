const WebSocket = require("ws");
const ws = new WebSocket.Server({port: 3030});
module.exports = ws;