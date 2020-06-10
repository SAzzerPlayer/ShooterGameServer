"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ChatMessageContainer_1 = require("../../ChatMessageContainer");
const ServerUserContainer_1 = require("../../ServerUserContainer");
exports.lobbyPushChatMessage = (message) => {
    ChatMessageContainer_1.ChatMessageContainer.push({
        text: message.text,
        user: message.key,
    });
    const pusher = ServerUserContainer_1.ServerUserContainer.getUserBy(message.key, 'key');
    const response = {
        type: 'LOBBY/PUSH_CHAT_MESSAGE',
        text: message.text,
        key: message.key,
        avatar: pusher === null || pusher === void 0 ? void 0 : pusher.avatar,
        name: pusher === null || pusher === void 0 ? void 0 : pusher.name,
    };
    for (const user of ServerUserContainer_1.ServerUserContainer.getUsers()) {
        if ((user === null || user === void 0 ? void 0 : user.socket) && user.socket.readyState === user.socket.OPEN) {
            user.socket.send(JSON.stringify(response));
        }
    }
};
//# sourceMappingURL=pushChatMessage.js.map