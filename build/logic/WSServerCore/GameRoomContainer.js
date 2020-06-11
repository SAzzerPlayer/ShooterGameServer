"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameRoomCore_1 = require("../GameRoomCore/GameRoomCore");
const ServerUserContainer_1 = require("./ServerUserContainer");
class GameRoomContainer {
}
exports.GameRoomContainer = GameRoomContainer;
GameRoomContainer.container = [];
GameRoomContainer.createRoom = (usersLimit, user, complexity) => {
    const { container, limitOfRooms } = GameRoomContainer;
    if (container.length < limitOfRooms) {
        const newRoom = new GameRoomCore_1.GameRoomInstance(usersLimit, user, complexity);
        container.push(newRoom);
        return true;
    }
    return false;
};
GameRoomContainer.removeRoom = (key) => {
    const { container } = GameRoomContainer;
    const gameRoom = container.find((room) => room.key === key);
    gameRoom && container.splice(container.indexOf(gameRoom), 1);
};
GameRoomContainer.getRoom = (key) => GameRoomContainer.container.find((room) => room.key === key);
GameRoomContainer.getRooms = () => [...GameRoomContainer.container];
GameRoomContainer.clean = () => {
    GameRoomContainer.container.length = 0;
};
GameRoomContainer.log = () => { };
GameRoomContainer.sendLobbyUpdates = () => {
    const response = {
        type: 'LOBBY/REFRESH_LOBBY',
        rooms: GameRoomContainer.getRooms().map((room) => {
            return {
                key: room.key,
                complexity: room.complexity,
                limitUsers: +room.maxUsersLimit,
                currentUsers: room.users.length,
            };
        }),
    };
    for (const user of ServerUserContainer_1.ServerUserContainer.getUsers()) {
        !!user.socket && user.socket.send(JSON.stringify(response));
    }
};
GameRoomContainer.limitOfRooms = 4;
//# sourceMappingURL=GameRoomContainer.js.map