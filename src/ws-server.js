const { WebSocketServer } = require("ws");
const { setupWsEvents } = require("./modules/ws-events/events.js");

class WsServer {
  constructor(httpServer) {
    this.wss = new WebSocketServer({ server: httpServer });
  }

  setup() {
    this.wss.on("connection", (ws) => {
      setupWsEvents(ws, this.wss);
    });
  }
}

module.exports = {
  WsServer,
};
