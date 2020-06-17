"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.bindUser = (username, socket) => {
    const userCollection = index_1.GameServer.getUserCollection();
    const user = userCollection.getUserBy(username);
    if (user) {
        user.socket = socket;
        user.resetActivity();
        const message = {
            type: 'MAIN/BIND_USER',
            data: {
                result: true,
            },
        };
        socket.send(JSON.stringify(message));
    }
    else {
        const message = {
            type: 'MAIN/BIND_USER',
            data: {
                warning: 'Please, retry to register your account!',
                result: false,
            },
        };
        socket.send(JSON.stringify(message));
    }
};
//# sourceMappingURL=bindUser.js.map