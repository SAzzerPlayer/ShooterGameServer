const CURRENT_ROOM_USER = {
  roomId: '',
  username: '',
  key: '',
  avatar: 0,
  energy: 100,
  health: 200,
  maxHealth: 200,
  reward: 0,
  enemies: 0,
};
const CURRENT_STATISTICS = {
  stage: 0,
  time: 0,
  status: 'WAITING',
};
//@ts-ignore
const avatars = [
  '../../assets/avatars/1.jpg',
  '../../assets/avatars/2.jpg',
  '../../assets/avatars/3.jpg',
  '../../assets/avatars/4.jpg',
  '../../assets/avatars/5.jpg',
  '../../assets/avatars/6.jpg',
];

const gamerSocket = new WebSocket('ws://localhost:8080/');

gamerSocket.onmessage = (messageEvent) => {
  const message = JSON.parse(messageEvent.data);
  switch (message.type) {
    case 'MAIN/BIND_USER': {
      const message = {
        type: 'GAME/START_STAGE',
        data: {
          user: {
            username: CURRENT_ROOM_USER.username,
          },
          room: {
            single: {
              id: CURRENT_ROOM_USER.roomId,
            },
          },
        },
      };
      console.log(1);
      gamerSocket.send(JSON.stringify(message));
      break;
    }
    case 'GAME/START_STAGE': {
      startStage(message.data.room.game.users, 1);
      break;
    }
    case 'GAME/UPDATE': {
      updateField(
        message.data.room.game.enemies,
        message.data.room.game.gamers,
        message.data.room.game.state,
      );
      break;
    }
    case 'GAME/SHOT': {
      console.log(message);
      const index = message.data.room.game.action.shot.user.index;
      const shotUserAvatarRef = document.getElementById(
        `gamer-${index}-avatar`,
      ) as HTMLImageElement;
      shotUserAvatarRef.style.border = '2px red solid';
      setTimeout(() => {
        shotUserAvatarRef.style.border = '0';
      }, 300);
    }
  }
};

const changeHealth = () => {
  const healthProcent = Math.floor((CURRENT_ROOM_USER.health / CURRENT_ROOM_USER.maxHealth) * 100);
  console.log(healthProcent);
  const healthProcentSpan = document.getElementById('user-health') as HTMLSpanElement;
  healthProcentSpan.innerText = `${healthProcent}%`;
  if (healthProcent < 30) {
    healthProcentSpan.style.color = 'red';
  } else if (healthProcent < 70) {
    healthProcentSpan.style.color = 'yellow';
  } else {
    healthProcentSpan.style.color = 'green';
  }
};

const changeEnergy = () => {
  const batteryImg = document.getElementById('battery-state') as HTMLImageElement;
  if (CURRENT_ROOM_USER.energy < 10) {
    batteryImg.src = '../../assets/imgs/bat-level-0.png';
  } else if (CURRENT_ROOM_USER.energy < 40) {
    batteryImg.src = '../../assets/imgs/bat-level-1.png';
  } else if (CURRENT_ROOM_USER.energy < 70) {
    batteryImg.src = '../../assets/imgs/bat-level-2.png';
  } else if (CURRENT_ROOM_USER.energy <= 100) {
    batteryImg.src = '../../assets/imgs/bat-level-3.png';
  }
};

const changeStatistics = () => {
  const timeRef = document.getElementById('time-field') as HTMLParagraphElement;
  timeRef.innerText = `Time(s): ${Math.floor(CURRENT_STATISTICS.time)}`;
  const stageRef = document.getElementById('game-stage-number') as HTMLSpanElement;
  stageRef.innerText = `${CURRENT_STATISTICS.stage}`;
  const enemiesRef = document.getElementById('enemies-field') as HTMLParagraphElement;
  enemiesRef.innerText = `Enemies: ${CURRENT_ROOM_USER.enemies}`;
  const statusRef = document.getElementById('status-field') as HTMLParagraphElement;
  statusRef.innerText = `Status: ${CURRENT_STATISTICS.status}`;
};

const updateField = (enemies: any[], gamers: any[], state: any) => {
  const gameField = document.getElementById('game-area') as HTMLDivElement;
  for (const enemyDiv of document.getElementsByClassName('light-enemy')) {
    (enemyDiv as HTMLDivElement).style.display = 'none';
  }
  for (const enemyDiv of document.getElementsByClassName('light-enemy')) {
    gameField.removeChild(enemyDiv);
  }
  for (const enemy of enemies) {
    const enemyDiv = document.createElement('div') as HTMLDivElement;
    enemyDiv.className = 'light-enemy';
    enemyDiv.style.position = 'absolute';
    enemyDiv.style.width = `${enemy.width}px`;
    enemyDiv.style.height = `${enemy.height}px`;
    enemyDiv.style.borderRadius = `${enemy.width / 2}px`;
    enemyDiv.style.left = `${enemy.position.x}px`;
    enemyDiv.style.top = `${enemy.position.y}px`;
    enemyDiv.style.background = `no-repeat url(../../assets/imgs/enemy.png) center`;
    enemyDiv.style.backgroundSize = '100% 100%';
    gameField.appendChild(enemyDiv);
  }
  let index = 1;
  for (const gamer of gamers) {
    console.log(gamer.username, CURRENT_ROOM_USER.username);
    if (gamer.username === CURRENT_ROOM_USER.username) {
      CURRENT_ROOM_USER.energy = gamer.energy;
      CURRENT_ROOM_USER.health = gamer.health;
      CURRENT_ROOM_USER.maxHealth = gamer.maxHealth;
      CURRENT_ROOM_USER.enemies = gamer.enemies;
      CURRENT_ROOM_USER.reward = gamer.reward;
      changeHealth();
      changeEnergy();
      changeStatistics();
    }
    const rewardRef = document.getElementById(`gamer-${index}-reward`) as HTMLParagraphElement;
    rewardRef.innerText = `${gamer.reward}`;
    index += 1;
    if (gamer.health <= 1) {
      const avatarRef = document.getElementById(`gamer-${index}-avatar`) as HTMLImageElement;
      avatarRef.style.border = '5px yellow solid';
    }
  }

  CURRENT_STATISTICS.stage = state.stage;
  CURRENT_STATISTICS.time = state.time;
  CURRENT_STATISTICS.status = state.status;
};

gamerSocket.onopen = (messageEvent: Event) => {
  console.log('Socket is opening. Start binding the user');
  const message = {
    type: 'MAIN/BIND_USER',
    data: {
      user: CURRENT_ROOM_USER,
    },
  };
  gamerSocket.send(JSON.stringify(message));
};

gamerSocket.onerror = (err) => {
  console.log(`Socket error!!! ${err}`);
};

gamerSocket.onclose = (messageEvent: Event) => {
  setTimeout(() => {
    window.location.href = `/`;
  }, 20000);
  alert('Socket has closed. Something was happened');
};

const startStage = (users: any[], stage: number) => {
  users.forEach((user, index) => {
    const usernameRef = document.getElementById(`gamer-${index + 1}-username`) as HTMLSpanElement;
    usernameRef.innerText = user.username;
    const avatarRef = document.getElementById(`gamer-${index + 1}-avatar`) as HTMLImageElement;
    avatarRef.src = avatars[user.avatar];
  });
  let emptyUsers = 4 - users.length;
  while (emptyUsers > 0) {
    const userIndex = 4 - emptyUsers;
    const usernameRef = document.getElementById(
      `gamer-${userIndex + 1}-username`,
    ) as HTMLSpanElement;
    usernameRef.innerText = '---';
    const avatarRef = document.getElementById(`gamer-${userIndex + 1}-avatar`) as HTMLImageElement;
    avatarRef.src = '../../assets/avatars/unavailable.png';
    emptyUsers -= 1;
  }
  const stageRef = document.getElementById('game-stage-number') as HTMLSpanElement;
  stageRef.innerText = `${stage}`;
  //
  const userAvatarRef = document.getElementById('user-avatar') as HTMLImageElement;
  userAvatarRef.src = avatars[CURRENT_ROOM_USER.avatar];
  const usernameRef = document.getElementById('user-name') as HTMLSpanElement;
  usernameRef.innerText = CURRENT_ROOM_USER.username;
};

const leaveRoom = () => {
  window.location.href = '/lobbies';
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
