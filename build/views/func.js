"use strict";
//@ts-ignore
const avatars = [
    '../assets/avatars/1.jpg',
    '../assets/avatars/2.jpg',
    '../assets/avatars/3.jpg',
    '../assets/avatars/4.jpg',
    '../assets/avatars/5.jpg',
    '../assets/avatars/6.jpg',
];
let currentAvatar = 0;
const onClickMoveLeftAvatar = () => {
    if (currentAvatar === 0) {
        currentAvatar = 5;
    }
    else
        currentAvatar -= 1;
    const avatarRef = document.getElementById('avatar');
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
const onClickMoveRightAvatar = () => {
    const avatarRef = document.getElementById('avatar');
    if (currentAvatar === 5) {
        currentAvatar = 0;
    }
    else
        currentAvatar += 1;
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
const onClickButton = () => {
    const inputRef = document.getElementById('user_input');
    const text = inputRef === null || inputRef === void 0 ? void 0 : inputRef.value;
    if (text.length > 3) {
        const key = generateKey();
        sessionStorage.setItem('key', key);
        sessionStorage.setItem('avatar', currentAvatar.toString());
        sessionStorage.setItem('username', text);
        window.location.href = `/create_user?key=${key}&username=${text}&avatar=${currentAvatar}`;
    }
};
const generateKey = () => {
    const symbols = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const amount = symbols.length;
    let key = '';
    for (let i = 0; i < 31; i++) {
        let symbolIndex = Math.round(Math.random() * (amount - 1));
        key += symbols[symbolIndex];
    }
    return key;
};
const initLobbies = () => {
    const avatarRef = document.getElementById('avatar');
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
initLobbies();
//# sourceMappingURL=func.js.map