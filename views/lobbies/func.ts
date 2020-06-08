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
  name: string;
  avatar: number;
  key: string;
}

const socket = new WebSocket('ws://localhost:8080/');

const CURRENT_USER_OBJ = {
  key: '',
  name: '',
  avatar: 0,
};

socket.onmessage = (messageEvent) => {
  const message = JSON.parse(messageEvent.data);
  console.log(message);
  switch (message.type) {
    case 'MAIN/BIND_USER': {
      const message = {
        type: 'LOBBY/GET_LOBBY_HISTORY',
        key: CURRENT_USER_OBJ.key,
      };
      socket.send(JSON.stringify(message));
      break;
    }
    case 'LOBBY/GET_LOBBY_HISTORY': {
      for (const chatMessage of message.chat) {
        addMessageToChat(chatMessage as IChatMessage);
      }
      break;
    }
    case 'LOBBY/PUSH_CHAT_MESSAGE': {
      addMessageToChat(message as IChatMessage);
      break;
    }
  }
};

socket.onopen = (messageEvent: Event) => {
  console.log('Socket is opening. Start binding the user');
  const message = {
    type: 'MAIN/BIND_USER',
    key: CURRENT_USER_OBJ.key,
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
      key: CURRENT_USER_OBJ.key,
    };
    inputRef.value = '';
    socket.send(JSON.stringify(message));
  }
};

const addMessageToChat = (message: IChatMessage) => {
  const messageIs = message.key === CURRENT_USER_OBJ.key ? ' my-message' : ' user-message';
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
  messageUserName.innerText = message.name;
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

const checkUserHasData = () => {
  const key = sessionStorage.getItem('key');
  const name = sessionStorage.getItem('name');
  const avatar = sessionStorage.getItem('avatar');
  console.log(key, name, avatar);
  CURRENT_USER_OBJ.key = key as string;
  CURRENT_USER_OBJ.name = name as string;
  CURRENT_USER_OBJ.avatar = Number(avatar) as any;
  if (!key || !name || !avatar) {
    window.location.href = `/`;
  }
};

checkUserHasData();
