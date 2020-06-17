"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.pushMessage = (chatMessage) => {
    index_1.GameServer.getChatCollection().pushMessage(chatMessage);
    const message = {
        type: 'CHAT/PUSH_MESSAGE',
        data: {
            chat: {
                message: chatMessage,
            },
            result: true,
        },
    };
    index_1.GameServer.sendToEveryUser(message);
};
//# sourceMappingURL=pushMessage.js.map