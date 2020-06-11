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
        user: {key: CURRENT_USER_OBJ.key},
      };
      socket.send(JSON.stringify(message));
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

checkUserHasData();
