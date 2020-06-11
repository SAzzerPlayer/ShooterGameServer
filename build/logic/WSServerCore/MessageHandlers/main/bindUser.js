"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ServerUserContainer_1 = require("../../ServerUserContainer");
exports.mainBindUser = (message) => {
    const { user, socket } = message;
    const findUser = ServerUserContainer_1.ServerUserContainer.getUserBy(user.key, 'key');
    if (findUser && socket) {
        console.log(`User '${user.key}' has been registered`);
        !!findUser.setWebSocket && findUser.setWebSocket(socket);
        const message = {
            type: 'MAIN/BIND_USER',
            result: true,
        };
        socket.send(JSON.stringify(message));
    }
};
//# sourceMappingURL=bindUser.js.map