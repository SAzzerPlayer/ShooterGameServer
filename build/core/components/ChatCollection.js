"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CHAT_MESSAGES_MIN_LIMIT = 1;
const CHAT_MESSAGES_MAX_LIMIT = 200;
class ChatCollection {
    constructor(chatMessagesLimit = 100) {
        this.pushMessage = (message) => {
            const { collection, chatMessagesLimit } = this;
            if (collection.length === chatMessagesLimit) {
                collection.shift();
            }
            collection.push(message);
        };
        this.clean = () => {
            this.collection.length = 0;
        };
        this.getMessages = () => [...this.collection];
        this.collection = [];
        this.chatMessagesLimit =
            chatMessagesLimit > CHAT_MESSAGES_MIN_LIMIT && chatMessagesLimit < CHAT_MESSAGES_MAX_LIMIT
                ? chatMessagesLimit
                : Math.round((CHAT_MESSAGES_MAX_LIMIT - CHAT_MESSAGES_MIN_LIMIT) / 4) +
                    CHAT_MESSAGES_MIN_LIMIT;
    }
}
exports.ChatCollection = ChatCollection;
//# sourceMappingURL=ChatCollection.js.map