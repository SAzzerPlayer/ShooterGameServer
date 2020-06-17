"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const components_1 = require("./components");
class GameServer {
    constructor(maxUserAmount = 10, maxLobbiesAmount = 4, chatMessagesLimit = 200) {
        if (maxUserAmount instanceof Number) {
            GameServer._userCollection = new components_1.UserCollection(maxUserAmount);
            GameServer._maxLobbiesAmount = maxLobbiesAmount;
            GameServer._chatMessagesLimit = chatMessagesLimit;
        }
        else {
            const params = maxUserAmount;
            [GameServer._maxLobbiesAmount, GameServer._chatMessagesLimit] = [
                params.maxLobbiesAmount,
                params.chatMessagesLimit,
            ];
        }
        GameServer._instance = this;
    }
}
exports.GameServer = GameServer;
GameServer.getInstance = () => {
    if (GameServer._instance) {
        return GameServer._instance;
    }
    return (GameServer._instance = new GameServer());
};
GameServer.sendToUser = (username, message) => {
    const user = GameServer._userCollection;
};
GameServer.sendToUsers = (users, message) => { };
GameServer.sendToEveryUser = (message) => { };
GameServer.handleMessage = (message, socket) => {
    const { type, data } = JSON.parse(message);
    actions_1.produceAction(type, data, socket);
};
//# sourceMappingURL=index.js.map