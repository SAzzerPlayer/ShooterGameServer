"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const chat_1 = require("./chat");
const lobby_1 = require("./lobby");
const rooms_1 = require("./rooms");
const startStage_1 = require("./game/startStage");
const shot_1 = require("./game/shot");
exports.produceAction = (type, data, senderSocket) => {
    console.log(`[Received message]: ${type}`);
    switch (type) {
        case 'MAIN/BIND_USER': {
            main_1.mainBindUser(data.user.username, senderSocket);
            break;
        }
        case 'MAIN/CHECK_USER': {
            main_1.mainCheckUser(data.user.username);
            break;
        }
        case 'MAIN/PONG': {
            main_1.mainPong(data.user.username);
            break;
        }
        case 'CHAT/PUSH_MESSAGE': {
            chat_1.chatPushMessage(data.chat.message);
            break;
        }
        case 'LOBBY/GET_HISTORY': {
            lobby_1.lobbyGetHistory(data.user.username);
            break;
        }
        case 'ROOMS/CREATE_ROOM': {
            console.log(data);
            rooms_1.roomsCreateRoom(data.room.single.complexity, data.room.single.usersLimit, data.user.username);
            break;
        }
        case 'ROOMS/JOIN_ROOM': {
            rooms_1.roomsJoinRoom(data.user.username, data.room.single.id);
            break;
        }
        case 'GAME/START_STAGE': {
            startStage_1.startStage(data.room.single.id);
            break;
        }
        case 'GAME/SHOT': {
            shot_1.shot(data.user.username, data.room.single.id, data.room.game.action.shot);
            break;
        }
        default: {
            console.log(`[Error]: Undefined type of message!`);
            break;
        }
    }
};
//# sourceMappingURL=index.js.map