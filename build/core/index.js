"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const actions_1 = require("./actions");
const components_1 = require("./components");
const PING_PONG_INTERVAL = 5000; // ms
const MAX_ROOMS_AMOUNT = 4;
const MAX_USERS_AMOUNT = 20;
const MAX_PING_PONG_FAILURE_SIGNAL_AMOUNT = 3;
const CHAT_MESSAGES_LIMIT = 200;
class GameServer {
}
exports.GameServer = GameServer;
GameServer._userCollection = new components_1.UserCollection(MAX_USERS_AMOUNT);
GameServer._chatCollection = new components_1.ChatCollection(CHAT_MESSAGES_LIMIT);
GameServer._roomsCollection = new components_1.RoomsCollection(MAX_ROOMS_AMOUNT);
GameServer.pingPongTimerId = 0;
GameServer.sendToUser = (username, message) => {
    const user = GameServer._userCollection.getUserBy(username);
    if (!!user && !!user.socket) {
        user.resetActivity();
        user.socket.send(JSON.stringify(message));
    }
    else
        console.log(`[Error]: Couldn't send message to user ${username}`);
};
GameServer.sendToUsers = (users, message) => {
    const foundUsers = GameServer._userCollection
        .getUsers()
        .filter((currentUser) => users.includes(currentUser.username));
    for (const user of foundUsers) {
        if (user.socket) {
            user.resetActivity();
            user.socket.send(JSON.stringify(message));
        }
        else
            console.log(`[Error]: Couldn't send message to user ${user.username}`);
    }
};
GameServer.sendToEveryUser = (message) => {
    for (const user of GameServer._userCollection.getUsers()) {
        if (user.socket) {
            user.resetActivity();
            user.socket.send(JSON.stringify(message));
        }
        else
            console.log(`[Error]: Couldn't send message to user ${user.username}`);
    }
};
GameServer.getUserCollection = () => GameServer._userCollection;
GameServer.getChatCollection = () => GameServer._chatCollection;
GameServer.getRoomsCollection = () => GameServer._roomsCollection;
GameServer.handleMessage = (message, socket) => {
    const { type, data } = JSON.parse(message);
    actions_1.produceAction(type, data, socket);
};
GameServer.startPingPong = () => {
    GameServer.pingPongTimerId = setInterval(() => {
        for (const user of GameServer.getUserCollection().getUsers()) {
            if (Date.now() - user.lastActivityTimestamp > 15000) {
                user.numberOfFailures += 1;
                const message = {
                    type: 'MAIN/PING',
                    data: {
                        result: false,
                    },
                };
                GameServer.sendToUser(user.username, message);
            }
            if (user.numberOfFailures > MAX_PING_PONG_FAILURE_SIGNAL_AMOUNT) {
                GameServer.getUserCollection().unregister(user);
            }
        }
    }, PING_PONG_INTERVAL);
};
GameServer.stopPingPong = () => {
    for (const user of GameServer.getUserCollection().getUsers()) {
        user.resetActivity();
    }
    clearInterval(GameServer.pingPongTimerId);
};
//# sourceMappingURL=index.js.map