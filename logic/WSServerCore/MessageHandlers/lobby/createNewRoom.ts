import {IMessage} from '../../../interfaces/MessageTypes';
import {GameRoomContainer} from '../../GameRoomContainer';
import {ServerUserContainer} from '../../ServerUserContainer';

export const lobbyCreateNewRoom = (message: IMessage) => {
  const {room, user, type} = message;
  if (!!room && !!user) {
    const {createRoom, container} = GameRoomContainer;
    const serverUser = ServerUserContainer.getUserBy(user.key, 'key');
    if (serverUser && createRoom(room!.limitUsers, serverUser, room!.complexity)) {
      const createdRoom = container[container.length - 1];
      const response = {
        type,
        room: {
          key: createdRoom.key,
          complexity: room.complexity,
          limitUsers: +room.limitUsers,
          currentUsers: 1,
        },
        user: {
          key: user.key,
        },
      };
      ServerUserContainer.getUsers().forEach((connectedServerUser) => {
        connectedServerUser?.socket && connectedServerUser.socket.send(JSON.stringify(response));
      });
      return;
    }
    const response = {
      type: 'MAIN/WARNING',
      text: 'Limit of rooms is exceeded!',
    };
    !!serverUser && !!serverUser?.socket && serverUser.socket.send(JSON.stringify(response));
  }
};
