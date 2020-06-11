import {IUser, User} from '../WSServerCore/ServerUserContainer';
import {generate32SymbolsKey} from '../utils/generate32SymbolsKey';

export enum EGameRoomComplexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Impossible = 'Impossible',
}
//ЯДРО
export class GameRoomCore {
  users: string[];
  constructor() {
    this.users = [];
  }
  setParams() {}
  getParams() {}
}
//оболочка
export interface IGameUser {
  serverUser: IUser;
}

export class GameUser implements IGameUser {
  serverUser: User;
  constructor(user: IUser) {
    this.serverUser = user;
  }
}

export interface IGameRoomInstance {
  maxUsersLimit: number;
  users: IGameUser[];
  core: GameRoomCore;
  complexity: EGameRoomComplexity;
  key: string;
}
//оболочка
export class GameRoomInstance implements IGameRoomInstance {
  maxUsersLimit: number;
  users: IGameUser[];
  core: GameRoomCore;
  complexity: EGameRoomComplexity;
  key: string;

  constructor(usersLimit: number, creator: IUser, complexity: EGameRoomComplexity) {
    this.maxUsersLimit = usersLimit > 1 && usersLimit <= 4 ? usersLimit : 2;
    const creatorGameUser = new GameUser(creator);
    this.users = [creatorGameUser];
    this.core = new GameRoomCore();
    this.key = generate32SymbolsKey();
    this.complexity = complexity;
  }
  addUser = (user: IUser) => {
    const {users, maxUsersLimit, key} = this;
    if (users.length >= maxUsersLimit) {
      console.log(`Couldn't add user ${user.key} to the GameRoom ${key}. User limit is exceeded!`);
    } else {
      users.push(new GameUser(user));
    }
  };
  removeUser = (key: string) => {
    const {users} = this;
    const user = users.find((gameUser) => gameUser.serverUser.key === key);
    !!user && users.splice(users.indexOf(user));
  };
}
