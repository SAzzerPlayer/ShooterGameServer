import {TWSMessage, IWSMessageData} from '../shared';
import {mainBindUser, mainPong, mainCheckUser} from './main';
import {chatPushMessage} from './chat';
import {lobbyGetHistory} from './lobby';

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
    default: {
      console.log(`[Error]: Undefined type of message!`);
      break;
    }
  }
};
