export interface IChatMessage {
  message: string;
  user: string;
}

export class ChatMessageContainer {
  static container = [] as IChatMessage[];
  static push = (message: IChatMessage) => {
    const {container} = ChatMessageContainer;
    if (container.length === 100) {
      container.splice(0, 1);
    }
    container.push(message);
  };
  static clean = () => {};
  static getMessages = () => [...ChatMessageContainer.container];
}
