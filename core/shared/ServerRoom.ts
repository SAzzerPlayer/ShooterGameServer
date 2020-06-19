import {ServerUser} from './ServerUser';
import {GameCollection} from '../components/GameCollection';

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
  core?: GameCollection;

  constructor(
    id: string | IServerRoomParams,
    complexity: EServerRoomComplexity = EServerRoomComplexity.Easy,
    usersLimit: TServerRoomUserLimit = 1,
  ) {
    if (typeof id === 'string') {
      this.id = id as string;
      this.complexity = complexity;
      this.usersLimit = Number(usersLimit) as 1 | 2 | 3 | 4;
    } else {
      const params = id as IServerRoomParams;
      this.id = params.id!;
      this.complexity = params.complexity!;
      this.usersLimit = Number(params.usersLimit!) as 1 | 2 | 3 | 4;
    }
    this.users = [];
    this.core = undefined;
  }

  joinUser = (user: ServerUser) => {
    const {users, usersLimit} = this;
    if (users.length < usersLimit && user) {
      users.push(user);
      return true;
    }
    return false;
  };

  start = () => {
    const field = {
      xStart: 200,
      xEnd: 900,
      yStart: 125,
      yEnd: 400,
    };
    this.core = new GameCollection(this.id, this.complexity, field, this.users);
    this.core.start();
  };
}
