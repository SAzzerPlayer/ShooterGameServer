import {GameServer} from '../../index';

export const pong = (username: string) => {
  const user = GameServer.getUserCollection().getUserBy(username);
  if (user) {
    user.resetActivity();
  }
};
