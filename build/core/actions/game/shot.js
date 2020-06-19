"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.shot = (username, roomId, position) => {
    var _a;
    const room = index_1.GameServer.getRoomsCollection().getRoomBy(roomId);
    if (room) {
        const userIndex = 
        //@ts-ignore
        room.users.indexOf(room.users.find((currentUser) => currentUser.username === username)) + 1;
        console.log(userIndex);
        for (const user of room.users) {
            const message = {
                type: 'GAME/SHOT',
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
            index_1.GameServer.sendToUser(user.username, message);
        }
        (_a = room.core) === null || _a === void 0 ? void 0 : _a.shotByGamer(position, username);
    }
};
//# sourceMappingURL=shot.js.map