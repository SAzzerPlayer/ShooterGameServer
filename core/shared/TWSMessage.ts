import {IServerUserParams} from './ServerUser';
import {IServerRoomParams} from './ServerRoom';
import {IChatMessage} from './IChatMessage';

type TWSMessageMain =
  | 'MAIN/BIND_USER'
  | 'MAIN/PING'
  | 'MAIN/PONG'
  | 'MAIN/WARNING'
  | 'MAIN/CHECK_USER';

type TWSMessageLobby = 'LOBBY/GET_HISTORY';

type TWSMessageRooms = 'ROOMS/LOBBY_UPDATE' | 'ROOMS/CREATE_ROOM' | 'ROOMS/JOIN_ROOM';

type TWSMessageChat = 'CHAT/LOBBY_UPDATE' | 'CHAT/PUSH_MESSAGE';

type TWSMessageGame = 'GAME/';

export type TWSMessage =
  | TWSMessageMain
  | TWSMessageLobby
  | TWSMessageRooms
  | TWSMessageChat
  | TWSMessageGame;

export interface IWSMessageData {
  chat?: {
    history?: IChatMessage[];
    message?: IChatMessage;
  };
  game?: {};
  user?: IServerUserParams;
  room?: {
    history?: IServerRoomParams[];
    single?: IServerRoomParams;
  };
}

export interface IWSMessage {
  type: TWSMessage;
  data: IWSMessageData;
}

export interface IOutputWSMessageData extends IWSMessageData {
  state?: {};
  warning?: string;
  result: boolean;
}

export interface IOutputWSMessage extends IWSMessage {
  data: IOutputWSMessageData;
}
