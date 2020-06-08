import {IMessage} from '../../../interfaces/MessageTypes';
import {ChatMessageContainer} from '../../ChatMessageContainer';
import {ServerUserContainer} from '../../ServerUserContainer';

export const lobbyPushChatMessage = (message: IMessage) => {
  ChatMessageContainer.push({
    text: message.text as string,
    user: message.key as string,
  });
  const pusher = ServerUserContainer.getUserBy(message.key as string, 'key');
  const response = {
    type: 'LOBBY/PUSH_CHAT_MESSAGE',
    text: message.text,
    ...pusher,
  };
  for (const user of ServerUserContainer.getUsers()) {
    if (user?.socket && user.socket.readyState === user.socket.OPEN) {
      user.socket.send(JSON.stringify(response));
    }
  }
};
