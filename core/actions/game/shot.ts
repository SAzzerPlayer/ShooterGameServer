import {IPoint} from '../../components/GameCollection';
import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const shot = (username: string, roomId: string, position: IPoint) => {
  const room = GameServer.getRoomsCollection().getRoomBy(roomId);
  if (room) {
    const userIndex =
      //@ts-ignore
      room.users.indexOf(room.users.find((currentUser) => currentUser.username === username)) + 1;
    console.log(userIndex);
    for (const user of room.users) {
      const message = {
        type: 'GAME/SHOT' as TWSMessage,
        data: {
          room: {
            game: {
              action: {
                shot: {
                  user: {
                    index: userIndex,
                  },
                },
              },
            },
          },
          result: true,
        },
      };
      GameServer.sendToUser(user.username, message);
    }
    room.core?.shotByGamer(position, username);
  }
};
