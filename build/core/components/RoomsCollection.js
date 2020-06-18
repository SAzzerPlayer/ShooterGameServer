"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MAX_ROOM_AMOUNT = 8;
class RoomsCollection {
    constructor(maxRoomAmount) {
        this.addNewRoom = (room) => {
            const { collection, maxRoomAmount } = this;
            if (collection.length < maxRoomAmount) {
                collection.push(room);
                return true;
            }
            return false;
        };
        this.deleteRoom = (id) => {
            const { collection } = this;
            const room = this.getRoomBy(id);
            if (room) {
                collection.splice(collection.indexOf(room), 1);
            }
        };
        this.getRoomBy = (id) => this.collection.find((currentRoom) => currentRoom.id === id);
        this.getRooms = () => [...this.collection];
        this.clean = () => {
            this.collection.length = 0;
        };
        this.collection = [];
        this.maxRoomAmount = maxRoomAmount > 0 && maxRoomAmount <= MAX_ROOM_AMOUNT ? maxRoomAmount : 4;
    }
}
exports.RoomsCollection = RoomsCollection;
//# sourceMappingURL=RoomsCollection.js.map