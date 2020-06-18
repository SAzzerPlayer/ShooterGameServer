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
  CURRENT_ROOM_USER.key = key as string;
  CURRENT_ROOM_USER.username = username as string;
  CURRENT_ROOM_USER.avatar = Number(avatar) as number;
  CURRENT_ROOM_USER.roomId = roomId as string;
  if (!key || !username || !avatar || !roomId) {
    window.location.href = `/`;
  }
};
checkRoomUserHasData();
