import {GameServer} from '../../index';
import {IOutputWSMessage} from '../../shared';

export const bindUser = (username: string, socket: WebSocket) => {
  const userCollection = GameServer.getUserCollection();
  const user = userCollection.getUserBy(username);
  if (user) {
    user.socket = socket;
    user.resetActivity();
    const message = {
      type: 'MAIN/BIND_USER',
      data: {
        result: true,
      },
    };
    socket.send(JSON.stringify(message));
  } else {
    const message: IOutputWSMessage = {
      type: 'MAIN/BIND_USER',
      data: {
        warning: 'Please, retry to register your account!',
        result: false,
      },
    };
    socket.send(JSON.stringify(message));
  }
};
