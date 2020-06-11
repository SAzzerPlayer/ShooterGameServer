import {IMessage} from '../../../interfaces/MessageTypes';
import {ChatMessageContainer} from '../../ChatMessageContainer';
import {ServerUserContainer} from '../../ServerUserContainer';
import {GameRoomContainer} from '../../GameRoomContainer';

export const lobbyGetLobbyHistory = (message: IMessage) => {
  const response = {
    type: message.type,
    chat: ChatMessageContainer.getMessages()
      .filter((chatMessage) => ServerUserContainer.getUserBy(chatMessage.user, 'key'))
      .map((chatMessage) => {
        const user = ServerUserContainer.getUserBy(chatMessage!.user, 'key');
        return {
          ...chatMessage,
          user: {
            avatar: user?.avatar,
            name: user?.name,
          },
        };
      }),
    rooms: GameRoomContainer.getRooms().map((room) => {
      return {
        key: room.key,
        complexity: room.complexity,
        limitUsers: +room.maxUsersLimit,
        currentUsers: room.users.length,
      };
    }),
  };
  const user = ServerUserContainer.getUserBy(message.user!.key as string, 'key');
  if (user && user?.socket) {
    user.socket.send(JSON.stringify(response));
  }
};
