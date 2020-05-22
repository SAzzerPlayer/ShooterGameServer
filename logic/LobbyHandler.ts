
class User {

  key: string;
  name: string;
  avatar: string;
  lastActivity?: string;

  constructor(key: string, name: string, avatar: string) {
    this.key = key;
    this.name = name;
    this.avatar = avatar;
    this.lastActivity = new Date().toString();
  }
}

export class LobbyHandler {
  static users = [] as User[];
  static checkUser = (check_key: string) => {
    for(let user of LobbyHandler.users){
      if(user.key === check_key)
        return true;
    }
    return false
  };
  static addUser = (key: string, name: string, avatar: string) => {
    LobbyHandler.users.push(new User(key, name, avatar));
  };
}
