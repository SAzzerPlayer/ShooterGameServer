"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.getHistory = (username) => {
    const message = {
        type: 'LOBBY/GET_HISTORY',
        data: {
            chat: {
                history: index_1.GameServer.getChatCollection().getMessages(),
            },
            room: {
                history: index_1.GameServer.getRoomsCollection()
                    .getRooms()
                    .map((currentRoom) => {
                    return {
                        id: currentRoom.id,
                        complexity: currentRoom.complexity,
                        usersLimit: currentRoom.usersLimit,
                        usersAmount: currentRoom.users.length,
                    };
                }),
            },
            result: true,
        },
    };
    index_1.GameServer.sendToUser(username, message);
};
//# sourceMappingURL=getHistory.js.map