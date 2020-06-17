"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
exports.pong = (username) => {
    const user = index_1.GameServer.getUserCollection().getUserBy(username);
    if (user) {
        user.resetActivity();
    }
};
//# sourceMappingURL=pong.js.map