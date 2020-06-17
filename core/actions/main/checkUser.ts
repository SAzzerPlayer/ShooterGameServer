import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const checkUser = (username: string) => {
  const user = GameServer.getUserCollection().getUserBy(username);
  if (user) {
    const message = {
      type: 'MAIN/CHECK_USER' as TWSMessage,
      data: {
        state: {},
        result: true,
      },
    };
    GameServer.sendToUser(username, message);
  }
};
