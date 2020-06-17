import {TUserAvatar} from './ServerUser';

export interface IChatMessage {
  username: string;
  avatar: TUserAvatar;
  text: string;
}
