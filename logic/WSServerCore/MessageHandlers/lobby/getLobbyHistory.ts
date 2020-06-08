import {IMessage} from '../../../interfaces/MessageTypes';
import {ChatMessageContainer} from '../../ChatMessageContainer';
import {ServerUserContainer} from '../../ServerUserContainer';

export const lobbyGetLobbyHistory = (message: IMessage) => {
  const {key} = message;
  const response = {
    type: message.type,
    chat: ChatMessageContainer.getMessages()
      .filter((message) => ServerUserContainer.getUserBy(message.user, 'key'))
      .map((message) => {
        const user = ServerUserContainer.getUserBy(message.user, 'key');
        return {
          ...message,
          avatar: user?.avatar,
          name: user?.name,
        };
      }),
  };
  const user = ServerUserContainer.getUserBy(key as string, 'key');
  if (user && user?.socket) {
    user.socket.send(JSON.stringify(response));
  }
};
