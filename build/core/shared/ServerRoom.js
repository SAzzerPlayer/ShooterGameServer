"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        if (typeof id === 'string') {
            this.id = id;
            this.complexity = complexity;
            this.usersLimit = usersLimit;
        }
        else {
            const params = id;
            this.id = params.id;
            this.complexity = params.complexity;
            this.usersLimit = params.usersLimit;
        }
        this.users = [];
    }
}
exports.ServerRoom = ServerRoom;
//# sourceMappingURL=ServerRoom.js.map