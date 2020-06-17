"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerUser {
    constructor(username, key = '', avatar = 0) {
        this.resetActivity = () => {
            this.lastActivityTimestamp = Date.now();
            this.numberOfFailures = 0;
        };
        if (username instanceof String) {
            [this.username, this.key, this.avatar] = [username, key, avatar];
        }
        else {
            const params = username;
            [this.username, this.key, this.avatar] = [params.username, params.key, params.avatar];
        }
        this.socket = null;
        this.lastActivityTimestamp = Date.now();
        this.numberOfFailures = 0;
    }
}
exports.ServerUser = ServerUser;
//# sourceMappingURL=ServerUser.js.map