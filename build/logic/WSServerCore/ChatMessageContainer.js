"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ChatMessageContainer {
}
exports.ChatMessageContainer = ChatMessageContainer;
ChatMessageContainer.container = [];
ChatMessageContainer.push = (message) => {
    const { container } = ChatMessageContainer;
    if (container.length === 100) {
        container.splice(0, 1);
    }
    container.push(message);
};
ChatMessageContainer.clean = () => { };
ChatMessageContainer.getMessages = () => [...ChatMessageContainer.container];
//# sourceMappingURL=ChatMessageContainer.js.map