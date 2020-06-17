"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.checkUser = (username) => {
    const user = index_1.GameServer.getUserCollection().getUserBy(username);
    if (user) {
        const message = {
            type: 'MAIN/CHECK_USER',
            data: {
                state: {},
                result: true,
            },
        };
        index_1.GameServer.sendToUser(username, message);
    }
};
//# sourceMappingURL=checkUser.js.map