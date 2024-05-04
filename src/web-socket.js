const WebSocket = require('ws');
const URL = process.env.WS_URL;
const socket = new WebSocket(URL); // Establecer la conexión con el servidor ws
module.exports = socket;