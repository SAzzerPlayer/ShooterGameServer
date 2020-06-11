//@ts-ignore
const avatars = [
  '../../assets/avatars/1.jpg',
  '../../assets/avatars/2.png',
  '../../assets/avatars/3.png',
  '../../assets/avatars/4.jpg',
  '../../assets/avatars/5.png',
  '../../assets/avatars/6.jpg',
];

interface IChatMessage {
  text: string;
  user: {
    name: string;
    avatar: number;
    key: string;
  };
}

interface IRoomMessage {
  key: string;
  limitUsers: number;
  currentUsers: number;
  complexity: string;
}

const socket = new WebSocket('ws://localhost:8080/');

const CURRENT_USER_OBJ = {
  key: '',
  name: '',
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
        type: 'LOBBY/GET_LOBBY_HISTORY',
        user: {key: CURRENT_USER_OBJ.key},
      };
      socket.send(JSON.stringify(message));
      break;
    }
    case 'LOBBY/GET_LOBBY_HISTORY': {
      if (message.chat) {
        for (const chatMessage of message.chat) {
          addMessageToChat(chatMessage as IChatMessage);
        }
      }
      if (message.rooms) {
        for (const room of message.rooms) {
          addRoomToLobbies(room);
        }
      }
      break;
    }
    case 'LOBBY/PUSH_CHAT_MESSAGE': {
      addMessageToChat(message as IChatMessage);
      break;
    }
    case 'MAIN/WARNING': {
      console.log(message.text);
      break;
    }
    case 'LOBBY/CREATE_NEW_ROOM': {
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
    }
  }
};

socket.onopen = (messageEvent: Event) => {
  console.log('Socket is opening. Start binding the user');
  const message = {
    type: 'MAIN/BIND_USER',
    user: {key: CURRENT_USER_OBJ.key},
  };
  socket.send(JSON.stringify(message));
};

socket.onerror = (err) => {
  console.log(`Socket error!!! ${err}`);
};

socket.onclose = (messageEvent: Event) => {
  console.log('Socket has closed. Something was happened');
  setTimeout(() => {
    window.location.href = `/`;
  }, 5000);
};

const pushMessage = () => {
  const inputRef = document.getElementById('input-chat-message') as HTMLInputElement;
  const text = inputRef.value;
  if (text?.length) {
    const message = {
      type: 'LOBBY/PUSH_CHAT_MESSAGE',
      text: text,
      user: {
        key: CURRENT_USER_OBJ.key,
      },
    };
    inputRef.value = '';
    socket.send(JSON.stringify(message));
  }
};

const addMessageToChat = (message: IChatMessage) => {
  const messageIs = message.user.key === CURRENT_USER_OBJ.key ? ' my-message' : ' user-message';
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
  messageUserName.innerText = message.user.name;
  //
  const messageUserAvatar = document.createElement('img') as HTMLImageElement;
  messageUserAvatar.className = 'avatar';
  messageUserAvatar.src = avatars[message.user.avatar];
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
};

const checkUserHasData = () => {
  const key = sessionStorage.getItem('key');
  const name = sessionStorage.getItem('name');
  const avatar = sessionStorage.getItem('avatar');
  CURRENT_USER_OBJ.key = key as string;
  CURRENT_USER_OBJ.name = name as string;
  CURRENT_USER_OBJ.avatar = Number(avatar) as any;
  if (!key || !name || !avatar) {
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
    type: 'LOBBY/CREATE_NEW_ROOM',
  };
  socket.send(JSON.stringify(message));
  window.location.href = '/lobbies/#close';
};

checkUserHasData();
