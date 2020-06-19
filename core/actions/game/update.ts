import {GameServer} from '../../index';
import {TWSMessage} from '../../shared';

export const update = (roomId: string) => {
  const room = GameServer.getRoomsCollection().getRoomBy(roomId);
  if (room && room.users) {
    //@ts-ignore
    const gamers = Object.keys(room.core?.gamers).map((gamer) => {
      //@ts-ignore
      return room.core.gamers[gamer];
    });
    const message = {
      type: 'GAME/UPDATE' as TWSMessage,
      data: {
        room: {
          single: {
            id: roomId,
            complexity: room.complexity,
          },
          game: {
            enemies: room.core?.enemies,
            gamers,
            state: {
              time: room.core?.time,
              status: room.core?.status,
              stage: room.core?.stage,
            },
          },
        },
        result: true,
      },
    };
    const users = [] as string[];
    room.users.forEach((user) => {
      users.push(user.username);
    });
    GameServer.sendToUsers(users, message);
  }
};
