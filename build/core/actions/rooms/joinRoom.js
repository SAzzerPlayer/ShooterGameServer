"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.joinRoom = (username, roomId) => {
    const user = index_1.GameServer.getUserCollection().getUserBy(username);
    const room = index_1.GameServer.getRoomsCollection().getRoomBy(roomId);
    let result = false;
    if (user && user.socket && room) {
        result = room.joinUser(user);
        if (result) {
            const message = {
                type: 'ROOMS/JOIN_ROOM',
                data: {
                    room: {
                        single: {
                            id: roomId,
                            complexity: room.complexity,
                            usersLimit: room.usersLimit,
                            usersAmount: room.users.length,
                        },
                    },
                    result,
                },
            };
            index_1.GameServer.sendToUser(username, message);
            const updateMessage = {
                type: 'ROOMS/LOBBY_UPDATE',
                data: {
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
                    result,
                },
            };
            index_1.GameServer.sendToEveryUser(updateMessage);
        }
    }
    if (!result) {
        const message = {
            type: 'MAIN/WARNING',
            data: {
                message: 'Limit of active room users is exceeded!',
                result,
            },
        };
        index_1.GameServer.sendToUser(username, message);
    }
};
//# sourceMappingURL=joinRoom.js.map