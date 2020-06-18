import {TWSMessage, IWSMessageData} from '../shared';
import {mainBindUser, mainPong, mainCheckUser} from './main';
import {chatPushMessage} from './chat';
import {lobbyGetHistory} from './lobby';
import {roomsCreateRoom, roomsJoinRoom} from './rooms';

export const produceAction = (type: TWSMessage, data: IWSMessageData, senderSocket?: WebSocket) => {
  console.log(`[Received message]: ${type}`);
  switch (type) {
    case 'MAIN/BIND_USER': {
      mainBindUser(data.user!.username, senderSocket!);
      break;
    }
    case 'MAIN/CHECK_USER': {
      mainCheckUser(data.user!.username);
      break;
    }
    case 'MAIN/PONG': {
      mainPong(data.user!.username);
      break;
    }
    case 'CHAT/PUSH_MESSAGE': {
      chatPushMessage(data.chat!.message!);
      break;
    }
    case 'LOBBY/GET_HISTORY': {
      lobbyGetHistory(data.user!.username);
      break;
    }
    case 'ROOMS/CREATE_ROOM': {
      console.log(data);
      roomsCreateRoom(
        data.room!.single!.complexity!,
        data.room!.single!.usersLimit!,
        data.user!.username!,
      );
      break;
    }
    case 'ROOMS/JOIN_ROOM': {
      roomsJoinRoom(data.user!.username!, data.room!.single!.id!);
      break;
    }
    default: {
      console.log(`[Error]: Undefined type of message!`);
      break;
    }
  }
};
