import {IMessage, MessageTypes} from '../interfaces/MessageTypes';
import {
  lobbyCreateNewRoom,
  lobbyGetLobbyHistory,
  lobbyJoinRoom,
  lobbyPushChatMessage,
} from './MessageHandlers/lobby';
import {mainBindUser} from './MessageHandlers/main';

const messageTypeHandlers = {
  [MessageTypes['LOBBY/GET_LOBBY_HISTORY']]: lobbyGetLobbyHistory,
  [MessageTypes['LOBBY/PUSH_CHAT_MESSAGE']]: lobbyPushChatMessage,
  [MessageTypes['MAIN/BIND_USER']]: mainBindUser,
  [MessageTypes['LOBBY/JOIN_ROOM']]: lobbyJoinRoom,
  [MessageTypes['LOBBY/CREATE_NEW_ROOM']]: lobbyCreateNewRoom,
};

export class MessageHandler {
  static handle = (message: string, ws?: WebSocket) => {
    const messageBody = JSON.parse(message) as IMessage;
    messageBody.socket = messageBody.type === MessageTypes['MAIN/BIND_USER'] ? ws : undefined;
    messageTypeHandlers[messageBody.type](messageBody);
  };
  static log = () => {};
}
