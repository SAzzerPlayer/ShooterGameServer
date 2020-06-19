"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameCollection_1 = require("../components/GameCollection");
var EServerRoomComplexity;
(function (EServerRoomComplexity) {
    EServerRoomComplexity["Easy"] = "Easy";
    EServerRoomComplexity["Medium"] = "Medium";
    EServerRoomComplexity["Hard"] = "Hard";
    EServerRoomComplexity["Impossible"] = "Impossible";
})(EServerRoomComplexity = exports.EServerRoomComplexity || (exports.EServerRoomComplexity = {}));
class ServerRoom {
    constructor(id, complexity = EServerRoomComplexity.Easy, usersLimit = 1) {
        this.joinUser = (user) => {
            const { users, usersLimit } = this;
            if (users.length < usersLimit && user) {
                users.push(user);
                return true;
            }
            return false;
        };
        this.start = () => {
            const field = {
                xStart: 200,
                xEnd: 900,
                yStart: 125,
                yEnd: 400,
            };
            this.core = new GameCollection_1.GameCollection(this.id, this.complexity, field, this.users);
            this.core.start();
        };
        if (typeof id === 'string') {
            this.id = id;
            this.complexity = complexity;
            this.usersLimit = Number(usersLimit);
        }
        else {
            const params = id;
            this.id = params.id;
            this.complexity = params.complexity;
            this.usersLimit = Number(params.usersLimit);
        }
        this.users = [];
        this.core = undefined;
    }
}
exports.ServerRoom = ServerRoom;
//# sourceMappingURL=ServerRoom.js.map