"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameServer {
    constructor() {
        GameServer._instance = this;
    }
}
exports.GameServer = GameServer;
GameServer.getInstance = () => {
    if (GameServer._instance) {
        return GameServer._instance;
    }
    return GameServer._instance = new GameServer();
};
//# sourceMappingURL=index.js.map