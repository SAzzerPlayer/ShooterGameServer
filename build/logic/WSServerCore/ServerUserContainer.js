"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(key, name, avatar) {
        this.key = key;
        this.name = name;
        this.avatar = avatar;
        this.socket = undefined;
    }
    setWebSocket(socket) {
        this.socket = socket;
    }
}
exports.User = User;
class ServerUserContainer {
}
exports.ServerUserContainer = ServerUserContainer;
ServerUserContainer.container = [];
ServerUserContainer.register = (userObj) => {
    const user = new User(userObj.key, userObj.name, userObj.avatar);
    ServerUserContainer.container.push(user);
};
ServerUserContainer.getUserBy = (value, findBy) => {
    return ServerUserContainer.container.find((user) => (findBy === 'key' && user.key === value) ||
        (findBy === 'name' && user.name === value) ||
        (findBy === 'socket' && user.socket === value));
};
ServerUserContainer.removeUser = (key) => {
    const { container } = ServerUserContainer;
    const user = container.find((userInfo) => userInfo.key === key);
    if (user) {
        (user === null || user === void 0 ? void 0 : user.socket) && user.socket.close();
        container.splice(container.indexOf(user), 1);
    }
};
ServerUserContainer.getUsers = () => [...ServerUserContainer.container];
ServerUserContainer.clean = () => {
    ServerUserContainer.container.length = 0;
};
ServerUserContainer.log = () => { };
//# sourceMappingURL=ServerUserContainer.js.map