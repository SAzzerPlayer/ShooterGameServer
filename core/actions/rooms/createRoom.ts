import {EServerRoomComplexity, ServerRoom, TServerRoomUserLimit, TWSMessage} from '../../shared';
import {GameServer} from '../../index';
import {generate32SymbolsKey} from '../../utils/generate32SymbolsKey';
import {IServerRoomParams} from '../../shared/ServerRoom';

export const createRoom = (
  complexity: EServerRoomComplexity,
  usersLimit: TServerRoomUserLimit,
  username: string,
) => {
  let result = false;
  const user = GameServer.getUserCollection().getUserBy(username);
  if (user) {
    const roomId = generate32SymbolsKey();
    const room = new ServerRoom(roomId, complexity, usersLimit);
    result = GameServer.getRoomsCollection().addNewRoom(new ServerRoom(room));
    const message = {
      type: 'ROOMS/LOBBY_UPDATE' as TWSMessage,
      data: {
        room: {
          history: GameServer.getRoomsCollection()
            .getRooms()
            .map((currentRoom) => {
              return {
                id: currentRoom.id,
                complexity: currentRoom.complexity,
                usersLimit: currentRoom.usersLimit,
                usersAmount: currentRoom.users.length,
              } as IServerRoomParams;
            }),
        },
        result,
      },
    };
    GameServer.sendToEveryUser(message);
  }
  if (result === false) {
    const message = {
      type: 'MAIN/WARNING' as TWSMessage,
      data: {
        message: 'Limit of rooms is exceeded!',
        result,
      },
    };
    GameServer.sendToUser(username, message);
  }
};
