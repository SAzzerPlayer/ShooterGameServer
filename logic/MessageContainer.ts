interface Message {
  text: string;
  user: string;
}

export default class MessageContainer {
  container: Array<Message>;
  constructor() {
    this.container = [];
  }
  push(message: Message) {
    if (this.container.length === 100) {
      this.container.push(message);
      this.container.splice(0,1);
    }
  }
  clean() {
    this.container.length = 0;
  }
  getAllMessages() {
    return [...this.container];
  }
}
