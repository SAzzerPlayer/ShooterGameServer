import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const startStage = (roomId: string) => {
  const room = GameServer.getRoomsCollection().getRoomBy(roomId);
  if (room && room.users) {
    if (room.users.length === room.usersLimit) {
      console.log('Game starting');
      room.start();
    }
    const message = {
      type: 'GAME/START_STAGE' as TWSMessage,
      data: {
        room: {
          game: {
            enemies: room.core?.enemies.map((enemy) => ({
              position: enemy.position,
              width: 16,
              height: 16,
            })),
            users: room.users.map((user) => ({
              username: user.username,
              avatar: user.avatar,
            })),
          },
        },
        result: true,
      },
    };
    const users = [];
    for (const user of room.users) {
      users.push(user.username);
    }
    GameServer.sendToUsers(users, message);
  }
};
