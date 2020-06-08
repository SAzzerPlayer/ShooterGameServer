"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageTypes_1 = require("../interfaces/MessageTypes");
const lobby_1 = require("./MessageHandlers/lobby");
const main_1 = require("./MessageHandlers/main");
const messageTypeHandlers = {
    [MessageTypes_1.MessageTypes['LOBBY/GET_LOBBY_HISTORY']]: lobby_1.lobbyGetLobbyHistory,
    [MessageTypes_1.MessageTypes['LOBBY/PUSH_CHAT_MESSAGE']]: lobby_1.lobbyPushChatMessage,
    [MessageTypes_1.MessageTypes['MAIN/BIND_USER']]: main_1.mainBindUser,
    [MessageTypes_1.MessageTypes['LOBBY/JOIN_ROOM']]: lobby_1.lobbyJoinRoom,
    [MessageTypes_1.MessageTypes['LOBBY/CREATE_NEW_ROOM']]: lobby_1.lobbyCreateNewRoom,
};
class MessageHandler {
}
exports.MessageHandler = MessageHandler;
MessageHandler.handle = (message, ws) => {
    const messageBody = JSON.parse(message);
    messageBody.socket = messageBody.type === MessageTypes_1.MessageTypes['MAIN/BIND_USER'] ? ws : undefined;
    messageTypeHandlers[messageBody.type](messageBody);
};
MessageHandler.log = () => { };
//# sourceMappingURL=MessageHandler.js.map