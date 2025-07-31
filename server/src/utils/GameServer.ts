import { Server, Socket } from "socket.io";

export default class GameServer {
  private server: Server;

  constructor(port: number) {
    this.server = new Server(port);

    this.server.on("connect", this.onConnect);
    console.log(`Server has started on port ${port}`);

    process.on("SIGINT", () => {
      this.server.close();
      console.log("Server has closed");
    });
  }

  private onConnect = (socket: Socket) => {
    console.log(`Socket with session id: ${socket.id} has connected`);
    socket.on("disconnect", () => this.onDisconnect(socket));
  };

  private onDisconnect = (socket: Socket) => {
    console.log(`Socket with session id: ${socket.id} has diconnected`);
  };
}
