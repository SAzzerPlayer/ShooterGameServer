export type TUserAvatar = 0 | 1 | 2 | 3 | 4 | 5;

export interface IServerUserParams {
  username: string;
  key: string;
  avatar: TUserAvatar;
}

export class ServerUser {
  username: string;
  key: string;
  avatar: TUserAvatar;
  socket?: WebSocket | null;
  lastActivityTimestamp: number;
  numberOfFailures: number;

  constructor(username: string | IServerUserParams, key: string = '', avatar: TUserAvatar = 0) {
    if (username instanceof String) {
      [this.username, this.key, this.avatar] = [username as string, key, avatar];
    } else {
      const params = username as IServerUserParams;
      [this.username, this.key, this.avatar] = [params.username, params.key, params.avatar];
    }
    this.socket = null;
    this.lastActivityTimestamp = Date.now();
    this.numberOfFailures = 0;
  }

  resetActivity = () => {
    this.lastActivityTimestamp = Date.now();
    this.numberOfFailures = 0;
  };
}
