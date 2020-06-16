import {IShooterGameServer} from './shared';
import {} from './actions';

export class GameServer {
    protected static _instance :GameServer;
    private static _userCollection: any;

    constructor() {
        GameServer._instance = this;
    }

    public static getInstance = (): GameServer => {
        if(GameServer._instance) {
            return GameServer._instance;
        }
        return GameServer._instance = new GameServer();
    }
}