"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameRoomContainer_1 = require("../../GameRoomContainer");
const ServerUserContainer_1 = require("../../ServerUserContainer");
exports.lobbyCreateNewRoom = (message) => {
    const { room, user, type } = message;
    if (!!room && !!user) {
        const { createRoom, container } = GameRoomContainer_1.GameRoomContainer;
        const serverUser = ServerUserContainer_1.ServerUserContainer.getUserBy(user.key, 'key');
        if (serverUser && createRoom(room.limitUsers, serverUser, room.complexity)) {
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
            ServerUserContainer_1.ServerUserContainer.getUsers().forEach((connectedServerUser) => {
                (connectedServerUser === null || connectedServerUser === void 0 ? void 0 : connectedServerUser.socket) && connectedServerUser.socket.send(JSON.stringify(response));
            });
            return;
        }
        const response = {
            type: 'MAIN/WARNING',
            text: 'Limit of rooms is exceeded!',
        };
        !!serverUser && !!(serverUser === null || serverUser === void 0 ? void 0 : serverUser.socket) && serverUser.socket.send(JSON.stringify(response));
    }
};
//# sourceMappingURL=createNewRoom.js.map