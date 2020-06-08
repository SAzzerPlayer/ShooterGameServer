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
    const response = Object.assign({ type: 'LOBBY/PUSH_CHAT_MESSAGE', text: message.text }, pusher);
    for (const user of ServerUserContainer_1.ServerUserContainer.getUsers()) {
        if ((user === null || user === void 0 ? void 0 : user.socket) && user.socket.readyState === user.socket.OPEN) {
            user.socket.send(JSON.stringify(response));
        }
    }
};
//# sourceMappingURL=pushChatMessage.js.map