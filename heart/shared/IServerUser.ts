export type TUserAvatar = 0 | 1 | 2 | 3 | 4 | 5;

export interface IServerUser {
  username: string;
  key: string;
  avatar: TUserAvatar;
  isActive: boolean;
  socketErrorCounter: number;
}
