import {GameServer} from '../../index';
import {IChatMessage, TWSMessage} from '../../shared';

export const pushMessage = (chatMessage: IChatMessage) => {
  GameServer.getChatCollection().pushMessage(chatMessage);
  const message = {
    type: 'CHAT/PUSH_MESSAGE' as TWSMessage,
    data: {
      chat: {
        message: chatMessage,
      },
      result: true,
    },
  };
  GameServer.sendToEveryUser(message);
};
