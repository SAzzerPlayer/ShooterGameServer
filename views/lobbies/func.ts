//@ts-ignore
const avatars = [
  '../../assets/avatars/1.jpg',
  '../../assets/avatars/2.jpg',
  '../../assets/avatars/3.jpg',
  '../../assets/avatars/4.jpg',
  '../../assets/avatars/5.jpg',
  '../../assets/avatars/6.jpg',
];

interface IChatMessage {
  username: string;
  avatar: 0 | 1 | 2 | 3 | 4 | 5;
  text: string;
}

interface IRoomMessage {
  id?: string;
  complexity?: 'Easy' | 'Medium' | 'Hard' | 'Impossible';
  usersLimit?: 1 | 2 | 3 | 4;
  usersAmount?: number;
}

const socket = new WebSocket('ws://localhost:8080/');

const CURRENT_USER_OBJ = {
  key: '',
  username: '',
  avatar: 0,
};

let amountOfRooms = 0;

const updateAmountOfRooms = () => {
  (document.getElementById(
    'available-rooms',
  ) as HTMLSpanElement).textContent = `${amountOfRooms}/4`;
};

socket.onmessage = (messageEvent) => {
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
      if (message?.data?.chat?.history) {
        for (const chatMessage of message.data.chat.history) {
          addMessageToChat(chatMessage as IChatMessage);
        }
      }
      if (message?.data?.room?.history) {
        for (const roomMessage of message.data.room.history) {
          addRoomToLobbies(roomMessage);
        }
      }
      break;
    }
    case 'CHAT/PUSH_MESSAGE': {
      if (message?.data?.chat?.message) {
        addMessageToChat(message?.data?.chat?.message as IChatMessage);
      }
      break;
    }
    case 'MAIN/WARNING': {
      alert(message?.data?.message);
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
    case 'ROOMS/JOIN_ROOM': {
      if (message.data?.room?.single?.id) {
        const roomIdParam = `roomId=${message.data.room.single.id}`;
        sessionStorage.setItem('roomId', message.data.room.single.id);
        window.location.href = `/direct_to_room/?${roomIdParam}&user=${CURRENT_USER_OBJ.username}`;
      }
      break;
    }
    case 'ROOMS/LOBBY_UPDATE': {
      if (message?.data?.room?.history) {
        cleanLobbiesRooms();
        for (const room of message.data.room.history) {
          addRoomToLobbies(room);
        }
      }
      break;
    }
  }
};

socket.onopen = (messageEvent: Event) => {
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

socket.onclose = (messageEvent: Event) => {
  setTimeout(() => {
    window.location.href = `/`;
  }, 20000);
  alert('Socket has closed. Something was happened');
};

const pushMessage = () => {
  const inputRef = document.getElementById('input-chat-message') as HTMLInputElement;
  const text = inputRef.value;
  if (text?.length) {
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

const addMessageToChat = (message: IChatMessage) => {
  const messageIs =
    message.username === CURRENT_USER_OBJ.username ? ' my-message' : ' user-message';
  const chat = document.getElementById('chat-body') as HTMLDivElement;
  //
  const messageRow = document.createElement('div') as HTMLDivElement;
  messageRow.className = 'message bottom-divider' + messageIs;
  //
  const messageText = document.createElement('p') as HTMLParagraphElement;
  messageText.innerText = message.text;
  //
  const messageUserInfo = document.createElement('div') as HTMLDivElement;
  messageUserInfo.className = 'user-info' + messageIs;
  //
  const messageUserName = document.createElement('h4') as HTMLParagraphElement;
  messageUserName.innerText = message.username;
  //
  const messageUserAvatar = document.createElement('img') as HTMLImageElement;
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
  const roomsBody = document.getElementById('rooms-body') as HTMLDivElement;
  const roomsDivs = document.getElementsByClassName('rendered-room');
  amountOfRooms = 0;
  if (!!roomsDivs && !!roomsDivs.length) {
    for (const roomDiv of roomsDivs) {
      (roomDiv as HTMLDivElement).style.display = 'none';
      setTimeout(() => roomsBody.removeChild(roomDiv), 100);
    }
  }
};

const joinGameRoom = (room: IRoomMessage) => {
  const message = {
    type: 'ROOMS/JOIN_ROOM',
    data: {
      user: CURRENT_USER_OBJ,
      room: {
        single: room,
      },
    },
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
  roomUsers.textContent = `${message.usersAmount}/${message.usersLimit}`;
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
};

const checkUserHasData = () => {
  const key = sessionStorage.getItem('key');
  const username = sessionStorage.getItem('username');
  const avatar = sessionStorage.getItem('avatar');
  CURRENT_USER_OBJ.key = key as string;
  CURRENT_USER_OBJ.username = username as string;
  CURRENT_USER_OBJ.avatar = Number(avatar) as any;
  if (!key || !username || !avatar) {
    window.location.href = `/`;
  }
};

const createGameRoom = () => {
  const selectRoomComplexityRef = document.getElementById(
    'select-room-complexity',
  ) as HTMLSelectElement;
  const selectRoomUsersRef = document.getElementById('select-room-users') as HTMLSelectElement;
  const message = {
    room: {limitUsers: selectRoomUsersRef.value, complexity: selectRoomComplexityRef.value},
    user: {key: CURRENT_USER_OBJ.key},
    type: 'ROOMS/CREATE_ROOM',
    data: {
      room: {
        single: {
          complexity: selectRoomComplexityRef.value,
          usersLimit: selectRoomUsersRef.value,
        },
      },
      user: CURRENT_USER_OBJ,
    },
  };
  socket.send(JSON.stringify(message));
};

checkUserHasData();
