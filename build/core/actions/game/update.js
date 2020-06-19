"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.update = (roomId) => {
    var _a, _b, _c, _d, _e;
    const room = index_1.GameServer.getRoomsCollection().getRoomBy(roomId);
    if (room && room.users) {
        //@ts-ignore
        const gamers = Object.keys((_a = room.core) === null || _a === void 0 ? void 0 : _a.gamers).map((gamer) => {
            //@ts-ignore
            return room.core.gamers[gamer];
        });
        const message = {
            type: 'GAME/UPDATE',
            data: {
                room: {
                    single: {
                        id: roomId,
                        complexity: room.complexity,
                    },
                    game: {
                        enemies: (_b = room.core) === null || _b === void 0 ? void 0 : _b.enemies,
                        gamers,
                        state: {
                            time: (_c = room.core) === null || _c === void 0 ? void 0 : _c.time,
                            status: (_d = room.core) === null || _d === void 0 ? void 0 : _d.status,
                            stage: (_e = room.core) === null || _e === void 0 ? void 0 : _e.stage,
                        },
                    },
                },
                result: true,
            },
        };
        const users = [];
        room.users.forEach((user) => {
            users.push(user.username);
        });
        index_1.GameServer.sendToUsers(users, message);
    }
};
//# sourceMappingURL=update.js.map