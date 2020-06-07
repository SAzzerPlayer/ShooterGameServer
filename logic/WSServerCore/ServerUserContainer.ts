export type TTypeUserAvatar = 1 | 2 | 3 | 4 | 5 | 6;

export interface IUser {
  key: string;
  name: string;
  avatar: TTypeUserAvatar;
  socket?: WebSocket;
}

export class ServerUserContainer {
  static container = [] as IUser[];
  static register = () => {};
  static getUserBy = () => {};
  static removeUser = () => {};
  static getUsers = () => [...ServerUserContainer.container];
  static clean = () => {
    ServerUserContainer.container.length = 0;
  };
  static log = () => {};
}
