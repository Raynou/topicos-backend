const WebSocket = require('ws');
const URL = process.env.WS_URL;
const socket = new WebSocket(URL);
module.exports = socket;