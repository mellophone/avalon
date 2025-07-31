import { Server } from "socket.io";

export default class GameServer {
  private server: Server;

  constructor(port: number) {
    this.server = new Server(port);
  }
}
