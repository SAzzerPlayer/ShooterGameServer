"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServerUserContainer {
}
exports.ServerUserContainer = ServerUserContainer;
ServerUserContainer.container = [];
ServerUserContainer.register = () => { };
ServerUserContainer.getUserBy = () => { };
ServerUserContainer.removeUser = () => { };
ServerUserContainer.getUsers = () => [...ServerUserContainer.container];
ServerUserContainer.clean = () => {
    ServerUserContainer.container.length = 0;
};
ServerUserContainer.log = () => { };
//# sourceMappingURL=ServerUserContainer.js.map