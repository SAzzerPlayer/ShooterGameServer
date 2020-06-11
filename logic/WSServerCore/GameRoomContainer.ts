import {EGameRoomComplexity, GameRoomInstance} from '../GameRoomCore/GameRoomCore';
import {IUser, ServerUserContainer} from './ServerUserContainer';

export class GameRoomContainer {
  static container = [] as GameRoomInstance[];
  static createRoom = (usersLimit: number, user: IUser, complexity: EGameRoomComplexity) => {
    const {container, limitOfRooms} = GameRoomContainer;
    if (container.length < limitOfRooms) {
      const newRoom = new GameRoomInstance(usersLimit, user, complexity);
      container.push(newRoom);
      return true;
    }
    return false;
  };
  static removeRoom = (key: string) => {
    const {container} = GameRoomContainer;
    const gameRoom = container.find((room) => room.key === key);
    gameRoom && container.splice(container.indexOf(gameRoom), 1);
  };
  static getRoom = (key: string) => GameRoomContainer.container.find((room) => room.key === key);
  static getRooms = () => [...GameRoomContainer.container];
  static clean = () => {
    GameRoomContainer.container.length = 0;
  };
  static log = () => {};
  static sendLobbyUpdates = () => {
    const response = {
      type: 'LOBBY/REFRESH_LOBBY',
      rooms: GameRoomContainer.getRooms().map((room) => {
        return {
          key: room.key,
          complexity: room.complexity,
          limitUsers: +room.maxUsersLimit,
          currentUsers: room.users.length,
        };
      }),
    };
    for (const user of ServerUserContainer.getUsers()) {
      !!user.socket && user.socket.send(JSON.stringify(response));
    }
  };
  static readonly limitOfRooms = 4;
}
