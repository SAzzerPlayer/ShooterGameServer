"use strict";
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
    }
    else
        currentAvatar -= 1;
    const avatarRef = document.getElementById("avatar");
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
const onClickMoveLeftAvatar = () => {
    if (currentAvatar === 5) {
        currentAvatar = 0;
    }
    else
        currentAvatar += 1;
    const avatarRef = document.getElementById("avatar");
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
const onClickButton = () => {
    const inputRef = document.getElementById('user_input');
    const text = inputRef === null || inputRef === void 0 ? void 0 : inputRef.value;
};
const init = () => {
    const avatarRef = document.getElementById("avatar");
    if (avatarRef) {
        avatarRef.src = avatars[currentAvatar];
    }
};
init();
//# sourceMappingURL=func.js.map