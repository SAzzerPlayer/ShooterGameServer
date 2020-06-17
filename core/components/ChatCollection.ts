import {IChatMessage} from '../shared';

const CHAT_MESSAGES_MIN_LIMIT = 1;
const CHAT_MESSAGES_MAX_LIMIT = 200;

export class ChatCollection {
  collection: IChatMessage[];
  chatMessagesLimit: number;

  constructor(chatMessagesLimit: number = 100) {
    this.collection = [];
    this.chatMessagesLimit =
      chatMessagesLimit > CHAT_MESSAGES_MIN_LIMIT && chatMessagesLimit < CHAT_MESSAGES_MAX_LIMIT
        ? chatMessagesLimit
        : Math.round((CHAT_MESSAGES_MAX_LIMIT - CHAT_MESSAGES_MIN_LIMIT) / 4) +
          CHAT_MESSAGES_MIN_LIMIT;
  }

  pushMessage = (message: IChatMessage) => {
    const {collection, chatMessagesLimit} = this;
    if (collection.length === chatMessagesLimit) {
      collection.shift();
    }
    collection.push(message);
  };

  clean = () => {
    this.collection.length = 0;
  };

  getMessages = () => [...this.collection];
}
