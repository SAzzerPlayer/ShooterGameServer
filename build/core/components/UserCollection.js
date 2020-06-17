"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const MIN_AVAILABLE_USER_AMOUNT = 1;
const MAX_AVAILABLE_USER_AMOUNT = 20;
class UserCollection {
    constructor(maxUserAmount) {
        this.register = (user) => {
            const { collection, maxUserAmount } = this;
            if (collection.find((currentUser) => currentUser.username === user.username)) {
                return true;
            }
            if (collection.length < maxUserAmount) {
                collection.push(new shared_1.ServerUser(user));
                return true;
            }
            return false;
        };
        this.unregister = (user) => {
            const { collection } = this;
            !!user.socket && user.socket.close();
            collection.splice(collection.indexOf(user), 1);
        };
        this.bindSocketToUser = (username, socket) => {
            const { collection } = this;
            const user = collection.find((currentUser) => currentUser.username === username);
            if (user) {
                user.socket = socket;
                user.resetActivity();
            }
            else {
                console.log(`[Error]: User ${username} hasn't been found in the user collection!`);
            }
        };
        this.clean = () => {
            for (const user of this.collection) {
                !!user.socket && user.socket.close();
            }
            this.collection.length = 0;
        };
        this.getUsers = () => [...this.collection];
        this.getUserBy = (username) => this.collection.find((currentUser) => currentUser.username === username);
        this.collection = [];
        this.maxUserAmount =
            maxUserAmount >= MIN_AVAILABLE_USER_AMOUNT && maxUserAmount < MAX_AVAILABLE_USER_AMOUNT
                ? maxUserAmount
                : Math.round((MAX_AVAILABLE_USER_AMOUNT - MIN_AVAILABLE_USER_AMOUNT) / 4) +
                    MIN_AVAILABLE_USER_AMOUNT;
    }
}
exports.UserCollection = UserCollection;
//# sourceMappingURL=UserCollection.js.map