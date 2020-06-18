"use strict";
const CURRENT_ROOM_USER = {
    roomId: '',
    username: '',
    key: '',
    avatar: 0,
};
const checkRoomUserHasData = () => {
    const key = sessionStorage.getItem('key');
    const username = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');
    const roomId = sessionStorage.getItem('roomId');
    CURRENT_ROOM_USER.key = key;
    CURRENT_ROOM_USER.username = username;
    CURRENT_ROOM_USER.avatar = Number(avatar);
    CURRENT_ROOM_USER.roomId = roomId;
    if (!key || !username || !avatar || !roomId) {
        window.location.href = `/`;
    }
};
checkRoomUserHasData();
//# sourceMappingURL=func.js.map