"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameRoomContainer_1 = require("./GameRoomContainer");
const MessageHandler_1 = require("./MessageHandler");
const ChatMessageContainer_1 = require("./ChatMessageContainer");
const ServerUserContainer_1 = require("./ServerUserContainer");
class WSServerCore {
}
exports.default = WSServerCore;
WSServerCore.peerSockets = [];
WSServerCore.UserBase = ServerUserContainer_1.ServerUserContainer;
WSServerCore.ChatBase = ChatMessageContainer_1.ChatMessageContainer;
WSServerCore.GameBase = GameRoomContainer_1.GameRoomContainer;
WSServerCore.handleMessage = (message, ws) => {
    MessageHandler_1.MessageHandler.handle(message, ws);
};
WSServerCore.sendToOne = (user, message) => {
    /*const connection = WSServerCore.users.find((connect) => user === connect.user);
    if (connection) {
      connection.socket.send(message);
    } else console.log(`User: ${user} can't be find in the server core. Warning!!!`);*/
};
WSServerCore.sendToAll = (message) => {
    /*if (WSServerCore.peerSockets.length > 0) {
      for (let socket of WSServerCore.peerSockets) {
        socket.send(message);
      }
    } else console.log(`Server doesn't have any socket connections. Message can't be sent`);*/
};
WSServerCore.sendToGroup = (group, message) => {
    /*const connections = WSServerCore.users.filter((connect) => group.includes(connect.user));
    if (connections.length > 0) {
      for (let connection of connections) {
        connection.socket.send(message);
      }
    } else console.log(`Users: ${group} can't be find in the server core. WARNING!!!`);*/
};
WSServerCore.sendToAllWithoutGroup = (group, message) => {
    /*const connections = WSServerCore.users.filter((connect) => !group.includes(connect.user));
    if (connections.length > 0) {
      for (let connection of connections) {
        connection.socket.send(message);
      }
    } else console.log('List of active users is empty. WARNING!!!');*/
};
WSServerCore.setWatchers = () => { };
WSServerCore.cleanWatchers = () => { };
//# sourceMappingURL=index.js.map