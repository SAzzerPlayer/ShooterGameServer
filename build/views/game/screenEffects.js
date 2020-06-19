"use strict";
const shotByField = (x, y) => {
    const message = {
        type: 'GAME/SHOT',
        data: {
            user: {
                username: CURRENT_ROOM_USER.username,
            },
            room: {
                single: {
                    id: CURRENT_ROOM_USER.roomId,
                },
                game: {
                    action: {
                        shot: {
                            x,
                            y,
                        },
                    },
                },
            },
        },
    };
    gamerSocket.send(JSON.stringify(message));
};
const shotEffect = (event) => {
    var _a;
    if (CURRENT_ROOM_USER.energy >= 10 && CURRENT_ROOM_USER.health > 1) {
        const ShotDiv = document.createElement('div');
        let size = 32;
        ShotDiv.style.width = `${size}px`;
        ShotDiv.style.height = `${size}px`;
        ShotDiv.style.position = 'absolute';
        ShotDiv.style.left = `${event.x}px`;
        ShotDiv.style.top = `${event.y}px`;
        ShotDiv.style.backgroundColor = 'red';
        ShotDiv.style.borderRadius = `${size / 2}px`;
        (_a = document.getElementById('game-area')) === null || _a === void 0 ? void 0 : _a.appendChild(ShotDiv);
        let timer = setInterval(() => {
            if (size > 0)
                size -= 4;
            ShotDiv.style.width = `${size}px`;
            ShotDiv.style.height = `${size}px`;
            ShotDiv.style.borderRadius = `${size / 2}px`;
        }, 50);
        setTimeout(() => {
            var _a;
            clearInterval(timer);
            (_a = document.getElementById('game-area')) === null || _a === void 0 ? void 0 : _a.removeChild(ShotDiv);
            shotByField(event.x, event.y);
        }, 400);
        CURRENT_ROOM_USER.energy -= 10;
        changeEnergy();
    }
};
//# sourceMappingURL=screenEffects.js.map