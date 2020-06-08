import {IMessage} from '../../../interfaces/MessageTypes';
import {ServerUserContainer} from '../../ServerUserContainer';

export const mainBindUser = (message: IMessage) => {
  const {key, socket} = message;
  const user = ServerUserContainer.getUserBy(key as string, 'key');
  if (user && socket) {
    console.log(`User '${key}' has been registered`);
    user.setWebSocket(socket);
    const message = {
      type: 'MAIN/BIND_USER',
      result: true,
    };
    socket.send(JSON.stringify(message));
  }
};
