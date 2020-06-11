import {IMessage} from '../../../interfaces/MessageTypes';
import {ServerUserContainer} from '../../ServerUserContainer';

export const mainBindUser = (message: IMessage) => {
  const {user, socket} = message;
  const findUser = ServerUserContainer.getUserBy(user!.key as string, 'key');
  if (findUser && socket) {
    console.log(`User '${user!.key}' has been registered`);
    !!findUser.setWebSocket && findUser.setWebSocket(socket);
    const message = {
      type: 'MAIN/BIND_USER',
      result: true,
    };
    socket.send(JSON.stringify(message));
  }
};
