const shotByField = (x: number, y: number) => {
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

const shotEffect = (event: MouseEvent) => {
  if (CURRENT_ROOM_USER.energy >= 10 && CURRENT_ROOM_USER.health > 1) {
    const ShotDiv = document.createElement('div') as HTMLDivElement;
    let size = 32;
    ShotDiv.style.width = `${size}px`;
    ShotDiv.style.height = `${size}px`;
    ShotDiv.style.position = 'absolute';
    ShotDiv.style.left = `${event.x}px`;
    ShotDiv.style.top = `${event.y}px`;
    ShotDiv.style.backgroundColor = 'red';
    ShotDiv.style.borderRadius = `${size / 2}px`;
    document.getElementById('game-area')?.appendChild(ShotDiv);
    let timer = setInterval(() => {
      if (size > 0) size -= 4;
      ShotDiv.style.width = `${size}px`;
      ShotDiv.style.height = `${size}px`;
      ShotDiv.style.borderRadius = `${size / 2}px`;
    }, 50);
    setTimeout(() => {
      clearInterval(timer);
      document.getElementById('game-area')?.removeChild(ShotDiv);
      shotByField(event.x, event.y);
    }, 400);
    CURRENT_ROOM_USER.energy -= 10;
    changeEnergy();
  }
};
