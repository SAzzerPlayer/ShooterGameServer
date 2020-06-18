import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const getHistory = (username: string) => {
  const message = {
    type: 'LOBBY/GET_HISTORY' as TWSMessage,
    data: {
      chat: {
        history: GameServer.getChatCollection().getMessages(),
      },
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
      result: true,
    },
  };
  GameServer.sendToUser(username, message);
};
