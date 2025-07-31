import { Server, Socket } from "socket.io";
import Player from "./Player";

export default class GameServer {
  private server: Server;
  private players: PlayerCollection = {};
  private timeout: number = 30;

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
    socket.on("name", (name: string) => this.onName(socket, name));
  };

  private onDisconnect = (socket: Socket) => {
    console.log(`Socket with session id: ${socket.id} has disconnected`);
  };

  private onName = (socket: Socket, name: string) => {
    const existingPlayer = this.players[name];

    if (existingPlayer) {
      existingPlayer.setSocket(socket);
    } else {
      const player = new Player(name, socket);
      this.players[name] = player;
      console.log(`Player ${name} has connected on ${socket.id}`);
    }

    socket.on("disconnect", () => {});
  };

  private onPlayerDisconnect = (player: Player) => {
    const name = player.getName();
    const { id } = player.getSocket();

    setTimeout(() => {
      const currentPlayer = this.players[name];
      if (!currentPlayer) return;

      if (currentPlayer.getSocket().id === id) {
        console.log(`Player ${name} has disconnected from ${id}`);
        delete this.players[name];
      }
    }, this.timeout * 1000);
  };
}

// TODO: EXTRACT INTO TYPES DIRECTORY
type PlayerCollection = {
  [name: string]: Player | undefined;
};
