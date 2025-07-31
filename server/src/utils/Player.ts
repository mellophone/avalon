import { Socket } from "socket.io";

export default class Player {
  constructor(private name: string, private socket: Socket) {}

  public getName = () => {
    return this.name;
  };

  public getSocket = () => {
    return this.socket;
  };

  public setSocket = (socket: Socket) => {
    console.log(
      `Player ${this.name} has reconnected from ${this.socket.id} to ${socket.id}`
    );
    this.socket = socket;
  };
}
