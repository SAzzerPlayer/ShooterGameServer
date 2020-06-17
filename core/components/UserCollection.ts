import {ServerUser, IServerUserParams} from '../shared';

const MIN_AVAILABLE_USER_AMOUNT = 1;
const MAX_AVAILABLE_USER_AMOUNT = 20;

export class UserCollection {
  collection: ServerUser[];
  maxUserAmount: number;

  constructor(maxUserAmount: number) {
    this.collection = [];
    this.maxUserAmount =
      maxUserAmount >= MIN_AVAILABLE_USER_AMOUNT && maxUserAmount < MAX_AVAILABLE_USER_AMOUNT
        ? maxUserAmount
        : Math.round((MAX_AVAILABLE_USER_AMOUNT - MIN_AVAILABLE_USER_AMOUNT) / 4) +
          MIN_AVAILABLE_USER_AMOUNT;
  }

  register = (user: IServerUserParams): boolean => {
    const {collection, maxUserAmount} = this;
    if (collection.length < maxUserAmount) {
      collection.push(new ServerUser(user));
    }
    return false;
  };

  unregister = (user: ServerUser) => {
    const {collection} = this;
    !!user.socket && user.socket.close();
    collection.splice(collection.indexOf(user), 1);
  };

  bindSocketToUser = (username: string, socket: WebSocket) => {
    const {collection} = this;
    const user = collection.find((currentUser) => currentUser.username === username);
    if (user) {
      user.socket = socket;
      user.resetActivity();
    } else {
      console.log(`[Error]: User ${username} hasn't been found in the user collection!`);
    }
  };

  clean = () => {
    for (const user of this.collection) {
      !!user.socket && user.socket.close();
    }
    this.collection.length = 0;
  };

  getUsers = () => [...this.collection];

  getUserBy = (username: string) =>
    this.collection.find((currentUser) => currentUser.username === username);
}
