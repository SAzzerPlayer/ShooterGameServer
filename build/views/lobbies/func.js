"use strict";
//@ts-ignore
const avatars = [
    '../../assets/avatars/1.jpg',
    '../../assets/avatars/2.jpg',
    '../../assets/avatars/3.jpg',
    '../../assets/avatars/4.jpg',
    '../../assets/avatars/5.jpg',
    '../../assets/avatars/6.jpg',
];
const socket = new WebSocket('ws://localhost:8080/');
const CURRENT_USER_OBJ = {
    key: '',
    username: '',
    avatar: 0,
};
let amountOfRooms = 0;
const updateAmountOfRooms = () => {
    document.getElementById('available-rooms').textContent = `${amountOfRooms}/4`;
};
socket.onmessage = (messageEvent) => {
    var _a, _b, _c, _d, _e, _f, _g;
    const message = JSON.parse(messageEvent.data);
    console.log(message);
    switch (message.type) {
        case 'MAIN/BIND_USER': {
            const message = {
                type: 'LOBBY/GET_HISTORY',
                data: {
                    user: {
                        username: CURRENT_USER_OBJ.username,
                    },
                },
            };
            socket.send(JSON.stringify(message));
            break;
        }
        case 'LOBBY/GET_HISTORY': {
            if ((_b = (_a = message === null || message === void 0 ? void 0 : message.data) === null || _a === void 0 ? void 0 : _a.chat) === null || _b === void 0 ? void 0 : _b.history) {
                for (const chatMessage of message.data.chat.history) {
                    addMessageToChat(chatMessage);
                }
            }
            break;
        }
        case 'CHAT/PUSH_MESSAGE': {
            if ((_d = (_c = message === null || message === void 0 ? void 0 : message.data) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.message) {
                addMessageToChat((_f = (_e = message === null || message === void 0 ? void 0 : message.data) === null || _e === void 0 ? void 0 : _e.chat) === null || _f === void 0 ? void 0 : _f.message);
            }
            break;
        }
        case 'MAIN/WARNING': {
            alert((_g = message === null || message === void 0 ? void 0 : message.data) === null || _g === void 0 ? void 0 : _g.warning);
            break;
        }
        case 'MAIN/PING': {
            const message = {
                type: 'MAIN/PONG',
                data: {
                    user: {
                        username: CURRENT_USER_OBJ.username,
                    },
                },
            };
            socket.send(JSON.stringify(message));
            break;
        }
        /*case 'LOBBY/CREATE_NEW_ROOM': {
          if (message.user.key === CURRENT_USER_OBJ.key) {
            window.location.href = `/direct_to_room/?room=${message.room.key}&user=${message.user.key}`;
          }
          addRoomToLobbies(message.room);
          break;
        }
        case 'LOBBY/JOIN_ROOM': {
          window.location.href = `/direct_to_room/?room=${message.room.key}&user=${CURRENT_USER_OBJ.key}`;
          break;
        }
        case 'LOBBY/REFRESH_LOBBY': {
          cleanLobbiesRooms();
          for (const room of message.rooms) {
            addRoomToLobbies(room);
          }
          break;
        }*/
    }
};
socket.onopen = (messageEvent) => {
    console.log('Socket is opening. Start binding the user');
    const message = {
        type: 'MAIN/BIND_USER',
        data: {
            user: CURRENT_USER_OBJ,
        },
    };
    socket.send(JSON.stringify(message));
};
socket.onerror = (err) => {
    console.log(`Socket error!!! ${err}`);
};
socket.onclose = (messageEvent) => {
    setTimeout(() => {
        window.location.href = `/`;
    }, 20000);
    alert('Socket has closed. Something was happened');
};
const pushMessage = () => {
    const inputRef = document.getElementById('input-chat-message');
    const text = inputRef.value;
    if (text === null || text === void 0 ? void 0 : text.length) {
        const message = {
            type: 'CHAT/PUSH_MESSAGE',
            data: {
                chat: {
                    message: {
                        text,
                        username: CURRENT_USER_OBJ.username,
                        avatar: CURRENT_USER_OBJ.avatar,
                    },
                },
            },
        };
        inputRef.value = '';
        socket.send(JSON.stringify(message));
    }
};
const addMessageToChat = (message) => {
    const messageIs = message.username === CURRENT_USER_OBJ.username ? ' my-message' : ' user-message';
    const chat = document.getElementById('chat-body');
    //
    const messageRow = document.createElement('div');
    messageRow.className = 'message bottom-divider' + messageIs;
    //
    const messageText = document.createElement('p');
    messageText.innerText = message.text;
    //
    const messageUserInfo = document.createElement('div');
    messageUserInfo.className = 'user-info' + messageIs;
    //
    const messageUserName = document.createElement('h4');
    messageUserName.innerText = message.username;
    //
    const messageUserAvatar = document.createElement('img');
    messageUserAvatar.className = 'avatar';
    messageUserAvatar.src = avatars[message.avatar];
    //
    messageUserInfo.appendChild(messageUserName);
    messageUserInfo.appendChild(messageUserAvatar);
    messageRow.appendChild(messageText);
    messageRow.appendChild(messageUserInfo);
    chat.appendChild(messageRow);
    chat.scrollTop = chat.scrollHeight;
};
const cleanLobbiesRooms = () => {
    const roomsBody = document.getElementById('rooms-body');
    const roomsDivs = document.getElementsByClassName('rendered-room');
    amountOfRooms = 0;
    if (!!roomsDivs && !!roomsDivs.length) {
        for (const roomDiv of roomsDivs) {
            roomDiv.style.display = 'none';
            setTimeout(() => roomsBody.removeChild(roomDiv), 100);
        }
    }
};
/*const joinGameRoom = (room: IRoomMessage) => {
  const message = {
    type: 'LOBBY/JOIN_ROOM',
    room,
    user: CURRENT_USER_OBJ,
  };
  socket.send(JSON.stringify(message));
};

const addRoomToLobbies = (message: IRoomMessage) => {
  const lobby = document.getElementById('rooms-body') as HTMLDivElement;
  //
  const roomDiv = document.createElement('div') as HTMLDivElement;
  roomDiv.className = 'room-row bottom-divider rendered-room';
  //
  const roomNumber = document.createElement('p') as HTMLParagraphElement;
  amountOfRooms += 1;
  roomNumber.textContent = `${amountOfRooms}`;
  //
  const roomComplexity = document.createElement('p') as HTMLParagraphElement;
  roomComplexity.textContent = `${message.complexity}`;
  //
  const roomUsers = document.createElement('p') as HTMLParagraphElement;
  roomUsers.textContent = `${message.currentUsers}/${message.limitUsers}`;
  //
  const roomJoinButton = document.createElement('button') as HTMLButtonElement;
  roomJoinButton.className = 'main-interactive-button';
  roomJoinButton.onclick = () => joinGameRoom(message);
  roomJoinButton.innerText = 'Join';
  //
  roomDiv.appendChild(roomNumber);
  roomDiv.appendChild(roomComplexity);
  roomDiv.appendChild(roomUsers);
  roomDiv.appendChild(roomJoinButton);
  //
  lobby.appendChild(roomDiv);
  //
  updateAmountOfRooms();
};*/
const checkUserHasData = () => {
    const key = sessionStorage.getItem('key');
    const username = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');
    CURRENT_USER_OBJ.key = key;
    CURRENT_USER_OBJ.username = username;
    CURRENT_USER_OBJ.avatar = Number(avatar);
    if (!key || !username || !avatar) {
        window.location.href = `/`;
    }
};
const createGameRoom = () => {
    const selectRoomComplexityRef = document.getElementById('select-room-complexity');
    const selectRoomUsersRef = document.getElementById('select-room-users');
    const message = {
        room: { limitUsers: selectRoomUsersRef.value, complexity: selectRoomComplexityRef.value },
        user: { key: CURRENT_USER_OBJ.key },
        type: 'LOBBY/CREATE_NEW_ROOM',
    };
    socket.send(JSON.stringify(message));
};
checkUserHasData();
//# sourceMappingURL=func.js.map