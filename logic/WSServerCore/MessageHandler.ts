import {MessageTypes, IMessage} from '../../interfaces/MessageTypes';
import {lobbyGetMessageHistory, lobbyPushChatMessage} from './MessageHandlers/lobby';
import {mainBindUser} from './MessageHandlers/main';

const messageTypeHandlers = {
  [MessageTypes['LOBBY/GET_MESSAGE_HISTORY']]: lobbyGetMessageHistory,
  [MessageTypes['LOBBY/PUSH_CHAT_MESSAGE']]: lobbyPushChatMessage,
  [MessageTypes['MAIN/BIND_USER']]: mainBindUser,
  [MessageTypes['LOBBY/JOIN_ROOM']]: (message: IMessage) => {},
  [MessageTypes['LOBBY/CREATE_NEW_ROOM']]: (message: IMessage) => {},
};

export class MessageHandler {
  static handle = (message: string) => {
    const messageBody = JSON.parse(message) as IMessage;
    messageTypeHandlers[messageBody.type](messageBody);
  };
  static log = () => {};
}
