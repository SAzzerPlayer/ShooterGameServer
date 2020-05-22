"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(key, name, avatar) {
        this.key = key;
        this.name = name;
        this.avatar = avatar;
        this.lastActivity = new Date().toString();
    }
}
class LobbyHandler {
}
exports.LobbyHandler = LobbyHandler;
LobbyHandler.users = [];
LobbyHandler.checkUser = (check_key) => {
    for (let user of LobbyHandler.users) {
        if (user.key === check_key)
            return true;
    }
    return false;
};
LobbyHandler.addUser = (key, name, avatar) => {
    LobbyHandler.users.push(new User(key, name, avatar));
};
//# sourceMappingURL=LobbyHandler.js.map