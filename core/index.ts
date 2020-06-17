import {produceAction} from './actions';
import {ChatCollection, UserCollection} from './components';
import {IWSMessage, IOutputWSMessage, TWSMessage} from './shared';

const PING_PONG_INTERVAL = 5000; // ms
const MAX_ROOMS_AMOUNT = 4;
const MAX_USERS_AMOUNT = 20;
const CHAT_MESSAGES_LIMIT = 200;

export class GameServer {
  private static _userCollection = new UserCollection(MAX_USERS_AMOUNT);
  private static _chatCollection = new ChatCollection(CHAT_MESSAGES_LIMIT);
  private static _roomsCollection = [];
  private static pingPongTimerId = 0 as any;
  public static sendToUser = (username: string, message: IOutputWSMessage) => {
    const user = GameServer._userCollection.getUserBy(username);
    if (!!user && !!user.socket) {
      user.resetActivity();
      user.socket.send(JSON.stringify(message));
    } else console.log(`[Error]: Couldn't send message to user ${username}`);
  };
  public static sendToUsers = (users: string[], message: IOutputWSMessage) => {
    const foundUsers = GameServer._userCollection
      .getUsers()
      .filter((currentUser) => users.includes(currentUser.username));
    for (const user of foundUsers) {
      if (user.socket) {
        user.resetActivity();
        user.socket.send(JSON.stringify(message));
      } else console.log(`[Error]: Couldn't send message to user ${user.username}`);
    }
  };
  public static sendToEveryUser = (message: IOutputWSMessage) => {
    for (const user of GameServer._userCollection.getUsers()) {
      if (user.socket) {
        user.resetActivity();
        user.socket.send(JSON.stringify(message));
      } else console.log(`[Error]: Couldn't send message to user ${user.username}`);
    }
  };
  public static getUserCollection = () => GameServer._userCollection;
  public static getChatCollection = () => GameServer._chatCollection;
  public static getRoomsCollection = () => GameServer._roomsCollection;
  public static handleMessage = (message: string, socket?: WebSocket) => {
    const {type, data}: IWSMessage = JSON.parse(message);
    produceAction(type, data, socket);
  };
  public static startPingPong = () => {
    GameServer.pingPongTimerId = setInterval(() => {
      for (const user of GameServer.getUserCollection().getUsers()) {
        if (Date.now() - user.lastActivityTimestamp > 15000) {
          user.numberOfFailures += 1;
          const message = {
            type: 'MAIN/PING' as TWSMessage,
            data: {
              result: false,
            },
          };
          GameServer.sendToUser(user.username, message);
        }
        if (user.numberOfFailures > 6) {
          GameServer.getUserCollection().unregister(user);
        }
      }
    }, PING_PONG_INTERVAL);
  };
  public static stopPingPong = () => {
    for (const user of GameServer.getUserCollection().getUsers()) {
      user.resetActivity();
    }
    clearInterval(GameServer.pingPongTimerId);
  };
}
