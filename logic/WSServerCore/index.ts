import {GameRoomCore} from '../GameRoomCore/GameRoomCore';
import {GameRoomContainer} from './GameRoomContainer';
import {MessageHandler} from './MessageHandler';
import {ChatMessageContainer} from './ChatMessageContainer';
import {ServerUserContainer} from './ServerUserContainer';

export default class WSServerCore {
  static peerSockets = [] as WebSocket[];
  static UserBase = ServerUserContainer;
  static ChatBase = ChatMessageContainer;
  static GameBase = GameRoomContainer;
  static handleMessage = (message: string, ws?: WebSocket) => {
    MessageHandler.handle(message, ws);
  };
  static sendToOne = (user: string, message: string) => {
    /*const connection = WSServerCore.users.find((connect) => user === connect.user);
    if (connection) {
      connection.socket.send(message);
    } else console.log(`User: ${user} can't be find in the server core. Warning!!!`);*/
  };
  static sendToAll = (message: string) => {
    /*if (WSServerCore.peerSockets.length > 0) {
      for (let socket of WSServerCore.peerSockets) {
        socket.send(message);
      }
    } else console.log(`Server doesn't have any socket connections. Message can't be sent`);*/
  };
  static sendToGroup = (group: Array<string>, message: string) => {
    /*const connections = WSServerCore.users.filter((connect) => group.includes(connect.user));
    if (connections.length > 0) {
      for (let connection of connections) {
        connection.socket.send(message);
      }
    } else console.log(`Users: ${group} can't be find in the server core. WARNING!!!`);*/
  };
  static sendToAllWithoutGroup = (group: Array<string>, message: string) => {
    /*const connections = WSServerCore.users.filter((connect) => !group.includes(connect.user));
    if (connections.length > 0) {
      for (let connection of connections) {
        connection.socket.send(message);
      }
    } else console.log('List of active users is empty. WARNING!!!');*/
  };
  static setWatchers = () => {};
  static cleanWatchers = () => {};
}
