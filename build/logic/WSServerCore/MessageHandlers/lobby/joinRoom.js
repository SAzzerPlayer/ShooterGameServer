"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerUserContainer_1 = require("../../ServerUserContainer");
const GameRoomContainer_1 = require("../../GameRoomContainer");
exports.lobbyJoinRoom = (message) => {
    const { user, room } = message;
    if (user && room) {
        const serverUser = ServerUserContainer_1.ServerUserContainer.getUserBy(user.key, 'key');
        const serverRoom = GameRoomContainer_1.GameRoomContainer.getRoom(room.key);
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
                room: Object.assign(Object.assign({}, room), { currentUsers: room.currentUsers + 1 }),
            };
            !!serverUser.socket && serverUser.socket.send(JSON.stringify(response));
            GameRoomContainer_1.GameRoomContainer.sendLobbyUpdates();
        }
    }
};
//# sourceMappingURL=joinRoom.js.map