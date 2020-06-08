export type TTypeUserAvatar = 0 | 1 | 2 | 3 | 4 | 5;

export type TFindUserBy = 'key' | 'name' | 'socket';

export interface IUser {
  key: string;
  name: string;
  avatar: TTypeUserAvatar;
  socket?: WebSocket;
}

export class User implements IUser {
  key: string;
  name: string;
  avatar: TTypeUserAvatar;
  socket?: WebSocket;
  constructor(key: string, name: string, avatar: TTypeUserAvatar) {
    this.key = key;
    this.name = name;
    this.avatar = avatar;
    this.socket = undefined;
  }
  setWebSocket(socket: WebSocket) {
    this.socket = socket;
  }
}

export class ServerUserContainer {
  static container = [] as User[];
  static register = (userObj: IUser) => {
    const user = new User(userObj.key, userObj.name, userObj.avatar);
    ServerUserContainer.container.push(user);
  };
  static getUserBy = (value: string | WebSocket, findBy: TFindUserBy) => {
    return ServerUserContainer.container.find(
      (user) =>
        (findBy === 'key' && user.key === value) ||
        (findBy === 'name' && user.name === value) ||
        (findBy === 'socket' && user.socket === value),
    );
  };
  static removeUser = (key: string) => {
    const {container} = ServerUserContainer;
    const user = container.find((userInfo) => userInfo.key === key);
    if (user) {
      user?.socket && user.socket.close();
      container.splice(container.indexOf(user), 1);
    }
  };
  static getUsers = () => [...ServerUserContainer.container];
  static clean = () => {
    ServerUserContainer.container.length = 0;
  };
  static log = () => {};
}
