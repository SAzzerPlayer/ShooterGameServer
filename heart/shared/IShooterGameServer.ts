export interface IShooterGameServer {
    userCollection?: any;
    chatCollection?: any;
    lobbyCollection?: any;
    gameCollection?: any;
    wsMessageHandler?: any;
    setSingleCollection?: (user: any, chat: any, lobby: any, game: any, wsMessageHandler: any) => void;
    getUserCollection?: () => any;
    getChatCollection?: () => any;
    getLobbyCollection?: () => any;
    getGameCollection?: () => any;
}