"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatMessageContainer_1 = require("../../ChatMessageContainer");
const ServerUserContainer_1 = require("../../ServerUserContainer");
exports.lobbyGetLobbyHistory = (message) => {
    const { key } = message;
    const response = {
        type: message.type,
        chat: ChatMessageContainer_1.ChatMessageContainer.getMessages()
            .filter((message) => ServerUserContainer_1.ServerUserContainer.getUserBy(message.user, 'key'))
            .map((message) => {
            const user = ServerUserContainer_1.ServerUserContainer.getUserBy(message.user, 'key');
            return Object.assign(Object.assign({}, message), { avatar: user === null || user === void 0 ? void 0 : user.avatar, name: user === null || user === void 0 ? void 0 : user.name });
        }),
    };
    const user = ServerUserContainer_1.ServerUserContainer.getUserBy(key, 'key');
    if (user && (user === null || user === void 0 ? void 0 : user.socket)) {
        user.socket.send(JSON.stringify(response));
    }
};
//# sourceMappingURL=getLobbyHistory.js.map