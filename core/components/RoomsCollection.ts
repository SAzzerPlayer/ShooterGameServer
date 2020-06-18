import {ServerRoom} from '../shared';

const MAX_ROOM_AMOUNT = 8;

export class RoomsCollection {
  collection: ServerRoom[];
  maxRoomAmount: number;

  constructor(maxRoomAmount: number) {
    this.collection = [];
    this.maxRoomAmount = maxRoomAmount > 0 && maxRoomAmount <= MAX_ROOM_AMOUNT ? maxRoomAmount : 4;
  }

  addNewRoom = (room: ServerRoom) => {
    const {collection, maxRoomAmount} = this;
    if (collection.length < maxRoomAmount) {
      collection.push(room);
      return true;
    }
    return false;
  };

  deleteRoom = (id: string) => {
    const {collection} = this;
    const room = this.getRoomBy(id);
    if (room) {
      collection.splice(collection.indexOf(room), 1);
    }
  };

  getRoomBy = (id: string) => this.collection.find((currentRoom) => currentRoom.id === id);

  getRooms = () => [...this.collection];

  clean = () => {
    this.collection.length = 0;
  };
}
