"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageContainer {
    constructor() {
        this.container = [];
    }
    push(message) {
        if (this.container.length === 100) {
            this.container.push(message);
            this.container.splice(0, 1);
        }
    }
    clean() {
        this.container.length = 0;
    }
    getAllMessages() {
        return [...this.container];
    }
}
exports.default = MessageContainer;
//# sourceMappingURL=MessageContainer.js.map