"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GameRoomContainer {
}
exports.GameRoomContainer = GameRoomContainer;
GameRoomContainer.container = [];
GameRoomContainer.createRoom = () => { };
GameRoomContainer.removeRoom = () => { };
GameRoomContainer.getRoom = () => { };
GameRoomContainer.getRooms = () => [...GameRoomContainer.container];
GameRoomContainer.clean = () => {
    GameRoomContainer.container.length = 0;
};
GameRoomContainer.log = () => { };
//# sourceMappingURL=GameRoomContainer.js.map