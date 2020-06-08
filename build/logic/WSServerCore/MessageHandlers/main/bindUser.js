"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerUserContainer_1 = require("../../ServerUserContainer");
exports.mainBindUser = (message) => {
    const { key, socket } = message;
    const user = ServerUserContainer_1.ServerUserContainer.getUserBy(key, 'key');
    if (user && socket) {
        console.log(`User '${key}' has been registered`);
        user.setWebSocket(socket);
        const message = {
            type: 'MAIN/BIND_USER',
            result: true,
        };
        socket.send(JSON.stringify(message));
    }
};
//# sourceMappingURL=bindUser.js.map