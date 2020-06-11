import {IUser, TTypeUserAvatar} from '../WSServerCore/ServerUserContainer';
import {EGameRoomComplexity} from '../GameRoomCore/GameRoomCore';

export interface IMessageRoom {
  key: string;
  complexity: EGameRoomComplexity;
  limitUsers: number;
  currentUsers: number;
}

export interface IMessageUser {
  key: string;
  name?: string;
  avatar?: TTypeUserAvatar;
}

export interface IMessage {
  type: MessageTypes;
  text?: string;
  user?: IMessageUser;
  room?: IMessageRoom;
  socket?: WebSocket;
}

export enum MessageTypes {
  'LOBBY/CREATE_NEW_ROOM' = 'LOBBY/CREATE_NEW_ROOM',
  'LOBBY/PUSH_CHAT_MESSAGE' = 'LOBBY/PUSH_CHAT_MESSAGE',
  'LOBBY/GET_LOBBY_HISTORY' = 'LOBBY/GET_LOBBY_HISTORY',
  'LOBBY/JOIN_ROOM' = 'LOBBY/JOIN_ROOM',
  'LOBBY/REFRESH_ROOMS' = 'LOBBY/REFRESH_ROOMS',
  'MAIN/BIND_USER' = 'MAIN/BIND_USER',
  'MAIN/WARNING' = 'MAIN/WARNING',
}
