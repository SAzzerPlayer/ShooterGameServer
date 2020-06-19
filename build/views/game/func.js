"use strict";
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
const gamerSocket = new WebSocket('ws://shooter-game1-server-git-lab2game.apps.us-east-1.starter.openshift-online.com/');
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
            updateField(message.data.room.game.enemies, message.data.room.game.gamers, message.data.room.game.state);
            break;
        }
        case 'GAME/SHOT': {
            console.log(message);
            const index = message.data.room.game.action.shot.user.index;
            const shotUserAvatarRef = document.getElementById(`gamer-${index}-avatar`);
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
    const healthProcentSpan = document.getElementById('user-health');
    healthProcentSpan.innerText = `${healthProcent}%`;
    if (healthProcent < 30) {
        healthProcentSpan.style.color = 'red';
    }
    else if (healthProcent < 70) {
        healthProcentSpan.style.color = 'yellow';
    }
    else {
        healthProcentSpan.style.color = 'green';
    }
};
const changeEnergy = () => {
    const batteryImg = document.getElementById('battery-state');
    if (CURRENT_ROOM_USER.energy < 10) {
        batteryImg.src = '../../assets/imgs/bat-level-0.png';
    }
    else if (CURRENT_ROOM_USER.energy < 40) {
        batteryImg.src = '../../assets/imgs/bat-level-1.png';
    }
    else if (CURRENT_ROOM_USER.energy < 70) {
        batteryImg.src = '../../assets/imgs/bat-level-2.png';
    }
    else if (CURRENT_ROOM_USER.energy <= 100) {
        batteryImg.src = '../../assets/imgs/bat-level-3.png';
    }
};
const changeStatistics = () => {
    const timeRef = document.getElementById('time-field');
    timeRef.innerText = `Time(s): ${Math.floor(CURRENT_STATISTICS.time)}`;
    const stageRef = document.getElementById('game-stage-number');
    stageRef.innerText = `${CURRENT_STATISTICS.stage}`;
    const enemiesRef = document.getElementById('enemies-field');
    enemiesRef.innerText = `Enemies: ${CURRENT_ROOM_USER.enemies}`;
    const statusRef = document.getElementById('status-field');
    statusRef.innerText = `Status: ${CURRENT_STATISTICS.status}`;
};
const updateField = (enemies, gamers, state) => {
    const gameField = document.getElementById('game-area');
    for (const enemyDiv of document.getElementsByClassName('light-enemy')) {
        enemyDiv.style.display = 'none';
    }
    for (const enemyDiv of document.getElementsByClassName('light-enemy')) {
        gameField.removeChild(enemyDiv);
    }
    for (const enemy of enemies) {
        const enemyDiv = document.createElement('div');
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
        const rewardRef = document.getElementById(`gamer-${index}-reward`);
        rewardRef.innerText = `${gamer.reward}`;
        if (gamer.health <= 1) {
            const avatarRef = document.getElementById(`gamer-${index}-avatar`);
            avatarRef.style.border = '5px yellow solid';
        }
        index += 1;
    }
    CURRENT_STATISTICS.stage = state.stage;
    CURRENT_STATISTICS.time = state.time;
    CURRENT_STATISTICS.status = state.status;
};
gamerSocket.onopen = (messageEvent) => {
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
gamerSocket.onclose = (messageEvent) => {
    setTimeout(() => {
        window.location.href = `/`;
    }, 20000);
    alert('Socket has closed. Something was happened');
};
const startStage = (users, stage) => {
    users.forEach((user, index) => {
        const usernameRef = document.getElementById(`gamer-${index + 1}-username`);
        usernameRef.innerText = user.username;
        const avatarRef = document.getElementById(`gamer-${index + 1}-avatar`);
        avatarRef.src = avatars[user.avatar];
    });
    let emptyUsers = 4 - users.length;
    while (emptyUsers > 0) {
        const userIndex = 4 - emptyUsers;
        const usernameRef = document.getElementById(`gamer-${userIndex + 1}-username`);
        usernameRef.innerText = '---';
        const avatarRef = document.getElementById(`gamer-${userIndex + 1}-avatar`);
        avatarRef.src = '../../assets/avatars/unavailable.png';
        emptyUsers -= 1;
    }
    const stageRef = document.getElementById('game-stage-number');
    stageRef.innerText = `${stage}`;
    //
    const userAvatarRef = document.getElementById('user-avatar');
    userAvatarRef.src = avatars[CURRENT_ROOM_USER.avatar];
    const usernameRef = document.getElementById('user-name');
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