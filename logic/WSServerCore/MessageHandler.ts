import {IMessage, MessageTypes} from '../interfaces/MessageTypes';
import {
  lobbyCreateNewRoom,
  lobbyGetLobbyHistory,
  lobbyJoinRoom,
  lobbyPushChatMessage,
} from './MessageHandlers/lobby';
import {mainBindUser} from './MessageHandlers/main';

const messageTypeHandlers = {
  [MessageTypes['LOBBY/CREATE_NEW_ROOM']]: lobbyCreateNewRoom,
  [MessageTypes['LOBBY/GET_LOBBY_HISTORY']]: lobbyGetLobbyHistory,
  [MessageTypes['LOBBY/PUSH_CHAT_MESSAGE']]: lobbyPushChatMessage,
  [MessageTypes['LOBBY/JOIN_ROOM']]: lobbyJoinRoom,
  [MessageTypes['LOBBY/REFRESH_ROOMS']]: () => {},
  [MessageTypes['MAIN/BIND_USER']]: mainBindUser,
  [MessageTypes['MAIN/WARNING']]: () => {},
};

export class MessageHandler {
  static handle = (message: string, ws?: WebSocket) => {
    const messageBody = JSON.parse(message) as IMessage;
    console.log(messageBody);
    messageBody.socket = messageBody.type === MessageTypes['MAIN/BIND_USER'] ? ws : undefined;
    try {
      messageTypeHandlers[messageBody.type](messageBody);
    } catch {
      console.log(`Can't handle socket message. Message: ${message}`);
    }
  };
  static log = () => {};
}
