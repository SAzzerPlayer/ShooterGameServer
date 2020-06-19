"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.startStage = (roomId) => {
    var _a;
    const room = index_1.GameServer.getRoomsCollection().getRoomBy(roomId);
    if (room && room.users) {
        if (room.users.length === room.usersLimit) {
            console.log('Game starting');
            room.start();
        }
        const message = {
            type: 'GAME/START_STAGE',
            data: {
                room: {
                    game: {
                        enemies: (_a = room.core) === null || _a === void 0 ? void 0 : _a.enemies.map((enemy) => ({
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
        index_1.GameServer.sendToUsers(users, message);
    }
};
//# sourceMappingURL=startStage.js.map