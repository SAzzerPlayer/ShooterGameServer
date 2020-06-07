export class GameRoomContainer {
  static container = [];
  static createRoom = () => {};
  static removeRoom = () => {};
  static getRoom = () => {};
  static getRooms = () => [...GameRoomContainer.container];
  static clean = () => {
    GameRoomContainer.container.length = 0;
  };
  static log = () => {};
}
