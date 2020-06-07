export interface IMessage {
  type: MessageTypes;
  message?: string;
  user?: string;
}

export enum MessageTypes {
  'LOBBY/PUSH_CHAT_MESSAGE' = 'LOBBY/PUSH_CHAT_MESSAGE',
  'LOBBY/GET_MESSAGE_HISTORY' = 'LOBBY/GET_MESSAGE_HISTORY',
  'LOBBY/CREATE_NEW_ROOM' = 'LOBBY/GET_MESSAGE_HISTORY',
  'LOBBY/JOIN_ROOM' = 'LOBBY/JOIN_ROOM',
  'MAIN/BIND_USER' = 'MAIN/BIND_USER',
}
