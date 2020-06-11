"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate32SymbolsKey_1 = require("../utils/generate32SymbolsKey");
var EGameRoomComplexity;
(function (EGameRoomComplexity) {
    EGameRoomComplexity["Easy"] = "Easy";
    EGameRoomComplexity["Medium"] = "Medium";
    EGameRoomComplexity["Hard"] = "Hard";
    EGameRoomComplexity["Impossible"] = "Impossible";
})(EGameRoomComplexity = exports.EGameRoomComplexity || (exports.EGameRoomComplexity = {}));
//ЯДРО
class GameRoomCore {
    constructor() {
        this.users = [];
    }
    setParams() { }
    getParams() { }
}
exports.GameRoomCore = GameRoomCore;
class GameUser {
    constructor(user) {
        this.serverUser = user;
    }
}
exports.GameUser = GameUser;
//оболочка
class GameRoomInstance {
    constructor(usersLimit, creator, complexity) {
        this.addUser = (user) => {
            const { users, maxUsersLimit, key } = this;
            if (users.length >= maxUsersLimit) {
                console.log(`Couldn't add user ${user.key} to the GameRoom ${key}. User limit is exceeded!`);
            }
            else {
                users.push(new GameUser(user));
            }
        };
        this.removeUser = (key) => {
            const { users } = this;
            const user = users.find((gameUser) => gameUser.serverUser.key === key);
            !!user && users.splice(users.indexOf(user));
        };
        this.maxUsersLimit = usersLimit > 1 && usersLimit <= 4 ? usersLimit : 2;
        const creatorGameUser = new GameUser(creator);
        this.users = [creatorGameUser];
        this.core = new GameRoomCore();
        this.key = generate32SymbolsKey_1.generate32SymbolsKey();
        this.complexity = complexity;
    }
}
exports.GameRoomInstance = GameRoomInstance;
//# sourceMappingURL=GameRoomCore.js.map