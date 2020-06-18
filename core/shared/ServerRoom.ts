import {ServerUser} from './ServerUser';

export enum EServerRoomComplexity {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
  Impossible = 'Impossible',
}

export type TServerRoomUserLimit = 1 | 2 | 3 | 4;

export interface IServerRoomParams {
  id?: string;
  complexity?: EServerRoomComplexity;
  usersLimit?: TServerRoomUserLimit;
  usersAmount?: number;
}

export class ServerRoom {
  id: string;
  complexity: EServerRoomComplexity;
  usersLimit: TServerRoomUserLimit;
  users: ServerUser[];
  core?: any;

  constructor(
    id: string | IServerRoomParams,
    complexity: EServerRoomComplexity = EServerRoomComplexity.Easy,
    usersLimit: TServerRoomUserLimit = 1,
  ) {
    if (typeof id === 'string') {
      this.id = id as string;
      this.complexity = complexity;
      this.usersLimit = usersLimit;
    } else {
      const params = id as IServerRoomParams;
      this.id = params.id!;
      this.complexity = params.complexity!;
      this.usersLimit = params.usersLimit!;
    }
    this.users = [];
  }

  joinUser = (user: ServerUser) => {
    const {users, usersLimit} = this;
    if (users.length < usersLimit && user) {
      users.push(user);
      return true;
    }
    return false;
  };
}
