import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const joinRoom = (username: string, roomId: string) => {
  const user = GameServer.getUserCollection().getUserBy(username);
  const room = GameServer.getRoomsCollection().getRoomBy(roomId);
  let result = false;
  if (user && user.socket && room) {
    result = room.joinUser(user);
    if (result) {
      const message = {
        type: 'ROOMS/JOIN_ROOM' as TWSMessage,
        data: {
          room: {
            single: {
              id: roomId,
              complexity: room.complexity,
              usersLimit: room.usersLimit,
              usersAmount: room.users.length,
            },
          },
          result,
        },
      };
      GameServer.sendToUser(username, message);
      const updateMessage = {
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
                };
              }),
          },
          result,
        },
      };
      GameServer.sendToEveryUser(updateMessage);
    }
  }
  if (!result) {
    const message = {
      type: 'MAIN/WARNING' as TWSMessage,
      data: {
        message: 'Limit of active room users is exceeded!',
        result,
      },
    };
    GameServer.sendToUser(username, message);
  }
};
