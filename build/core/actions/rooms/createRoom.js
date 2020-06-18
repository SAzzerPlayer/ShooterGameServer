"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../../shared");
const index_1 = require("../../index");
const generate32SymbolsKey_1 = require("../../utils/generate32SymbolsKey");
exports.createRoom = (complexity, usersLimit, username) => {
    let result = false;
    const user = index_1.GameServer.getUserCollection().getUserBy(username);
    if (user) {
        const roomId = generate32SymbolsKey_1.generate32SymbolsKey();
        const room = new shared_1.ServerRoom(roomId, complexity, usersLimit);
        result = index_1.GameServer.getRoomsCollection().addNewRoom(new shared_1.ServerRoom(room));
        const message = {
            type: 'ROOMS/LOBBY_UPDATE',
            data: {
                room: {
                    history: index_1.GameServer.getRoomsCollection()
                        .getRooms()
                        .map((currentRoom) => {
                        return {
                            id: currentRoom.id,
                            complexity: currentRoom.complexity,
                            usersLimit: currentRoom.usersLimit,
                            usersAmount: currentRoom.users.length,
                        };
                    }),
                },
                result,
            },
        };
        index_1.GameServer.sendToEveryUser(message);
    }
    if (result === false) {
        const message = {
            type: 'MAIN/WARNING',
            data: {
                message: 'Limit of rooms is exceeded!',
                result,
            },
        };
        index_1.GameServer.sendToUser(username, message);
    }
};
//# sourceMappingURL=createRoom.js.map