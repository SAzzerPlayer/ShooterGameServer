export interface IMessage {
  type: MessageTypes;
  text?: string;
  user?: string;
  key?: string;
  socket?: WebSocket;
}

export enum MessageTypes {
  'LOBBY/PUSH_CHAT_MESSAGE' = 'LOBBY/PUSH_CHAT_MESSAGE',
  'LOBBY/GET_LOBBY_HISTORY' = 'LOBBY/GET_LOBBY_HISTORY',
  'LOBBY/CREATE_NEW_ROOM' = 'LOBBY/GET_MESSAGE_HISTORY',
  'LOBBY/JOIN_ROOM' = 'LOBBY/JOIN_ROOM',
  'MAIN/BIND_USER' = 'MAIN/BIND_USER',
}
