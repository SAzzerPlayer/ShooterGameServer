import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const getHistory = (username: string) => {
  const message = {
    type: 'LOBBY/GET_HISTORY' as TWSMessage,
    data: {
      chat: {
        history: GameServer.getChatCollection().getMessages(),
      },
      result: true,
    },
  };
  GameServer.sendToUser(username, message);
};
