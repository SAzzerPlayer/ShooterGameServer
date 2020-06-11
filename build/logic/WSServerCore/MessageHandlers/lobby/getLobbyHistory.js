"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatMessageContainer_1 = require("../../ChatMessageContainer");
const ServerUserContainer_1 = require("../../ServerUserContainer");
const GameRoomContainer_1 = require("../../GameRoomContainer");
exports.lobbyGetLobbyHistory = (message) => {
    const response = {
        type: message.type,
        chat: ChatMessageContainer_1.ChatMessageContainer.getMessages()
            .filter((chatMessage) => ServerUserContainer_1.ServerUserContainer.getUserBy(chatMessage.user, 'key'))
            .map((chatMessage) => {
            const user = ServerUserContainer_1.ServerUserContainer.getUserBy(chatMessage.user, 'key');
            return Object.assign(Object.assign({}, chatMessage), { user: {
                    avatar: user === null || user === void 0 ? void 0 : user.avatar,
                    name: user === null || user === void 0 ? void 0 : user.name,
                } });
        }),
        rooms: GameRoomContainer_1.GameRoomContainer.getRooms().map((room) => {
            return {
                key: room.key,
                complexity: room.complexity,
                limitUsers: +room.maxUsersLimit,
                currentUsers: room.users.length,
            };
        }),
    };
    const user = ServerUserContainer_1.ServerUserContainer.getUserBy(message.user.key, 'key');
    if (user && (user === null || user === void 0 ? void 0 : user.socket)) {
        user.socket.send(JSON.stringify(response));
    }
};
//# sourceMappingURL=getLobbyHistory.js.map