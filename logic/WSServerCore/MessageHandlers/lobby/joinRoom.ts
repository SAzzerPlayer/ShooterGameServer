import {IMessage} from '../../../interfaces/MessageTypes';
import {ServerUserContainer} from '../../ServerUserContainer';
import {GameRoomContainer} from '../../GameRoomContainer';

export const lobbyJoinRoom = (message: IMessage) => {
  const {user, room} = message;
  if (user && room) {
    const serverUser = ServerUserContainer.getUserBy(user.key, 'key');
    const serverRoom = GameRoomContainer.getRoom(room.key);
    console.log(serverRoom);
    if (serverRoom && serverUser) {
      if (serverRoom.users.length >= serverRoom.maxUsersLimit) {
        const response = {
          type: 'MAIN/WARNING',
          text: `You can't join to game, because limit of users is exceeded`,
        };
        serverUser.socket && serverUser.socket.send(JSON.stringify(response));
        return;
      }
      serverRoom.addUser(serverUser);
      const response = {
        type: 'LOBBY/JOIN_ROOM',
        result: true,
        room: {
          ...room,
          currentUsers: room.currentUsers + 1,
        },
      };
      !!serverUser.socket && serverUser.socket.send(JSON.stringify(response));
      GameRoomContainer.sendLobbyUpdates();
    }
  }
};
