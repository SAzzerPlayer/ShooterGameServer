//@ts-ignore
const avatars = [
  '../assets/avatars/1.jpg',
  '../assets/avatars/2.png',
  '../assets/avatars/3.png',
  '../assets/avatars/4.jpg',
  '../assets/avatars/5.png',
  '../assets/avatars/6.jpg',
];

let currentAvatar = 0;

const onClickMoveRightAvatar = () => {
  if (currentAvatar === 0) {
    currentAvatar = 5;
  } else currentAvatar -= 1;
  const avatarRef = document.getElementById('avatar') as HTMLImageElement;
  if (avatarRef) {
    avatarRef.src = avatars[currentAvatar];
  }
};

const onClickMoveLeftAvatar = () => {
  const avatarRef = document.getElementById('avatar') as HTMLImageElement;
  if (currentAvatar === 5) {
    currentAvatar = 0;
  } else currentAvatar += 1;
  if (avatarRef) {
    avatarRef.src = avatars[currentAvatar];
  }
};

const onClickButton = () => {
  const inputRef = document.getElementById('user_input') as HTMLInputElement;
  const text = inputRef?.value;
  if (text.length > 3) {
    const key = generateKey();
    sessionStorage.setItem('key', key);
    sessionStorage.setItem('avatar', currentAvatar.toString());
    sessionStorage.setItem('name', text);
    window.location.href = `/create_user?key=${key}&name=${text}&avatar=${currentAvatar}`;
  }
};

const generateKey = () => {
  const symbols = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  const amount = symbols.length;
  let key = '';
  for (let i = 0; i < 31; i++) {
    let symbolIndex = Math.round(Math.random() * amount);
    key += symbols[symbolIndex];
  }
  return key;
};

const initLobbies = () => {
  const avatarRef = document.getElementById('avatar') as HTMLImageElement;
  if (avatarRef) {
    avatarRef.src = avatars[currentAvatar];
  }
};

initLobbies();
