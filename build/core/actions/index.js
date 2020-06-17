"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const chat_1 = require("./chat");
const lobby_1 = require("./lobby");
exports.produceAction = (type, data, senderSocket) => {
    console.log(`[Received message]: ${type}`);
    switch (type) {
        case 'MAIN/BIND_USER': {
            main_1.mainBindUser(data.user.username, senderSocket);
            break;
        }
        case 'MAIN/CHECK_USER': {
            main_1.mainCheckUser(data.user.username);
            break;
        }
        case 'MAIN/PONG': {
            main_1.mainPong(data.user.username);
            break;
        }
        case 'CHAT/PUSH_MESSAGE': {
            chat_1.chatPushMessage(data.chat.message);
            break;
        }
        case 'LOBBY/GET_HISTORY': {
            lobby_1.lobbyGetHistory(data.user.username);
            break;
        }
        default: {
            console.log(`[Error]: Undefined type of message!`);
            break;
        }
    }
};
//# sourceMappingURL=index.js.map