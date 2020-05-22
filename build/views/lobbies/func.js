"use strict";
const socket = new WebSocket('ws://localhost:8080');
socket.onmessage = (messageEvent) => {
    const data = JSON.parse(messageEvent.data);
    console.log(messageEvent);
    switch (data.type) {
        case 'chat_message': {
            console.log(data.message, data.user);
            pushMessage(data.user, data.message);
        }
    }
};
const pushMessage = (user, message) => {
    const htmlNodeMessage = document.createElement('p');
    htmlNodeMessage.textContent = `${user}: ${message}`;
    const messageContainer = document.getElementById('message-container');
    messageContainer.appendChild(htmlNodeMessage);
};
const checkUserHasData = () => {
    const key = sessionStorage.getItem('client-key');
    const name = sessionStorage.getItem('username');
    const avatar = sessionStorage.getItem('avatar');
    console.log(key, name, avatar);
    if (!key || !name || !avatar) {
        //window.location.href = `/`;
    }
};
const sendMessage = () => {
    const inputRef = document.getElementById('input-message');
    const text = inputRef.value;
    if (text.length > 0) {
        const user = sessionStorage.getItem('username');
        socket.send(JSON.stringify({ type: 'chat_message', message: text, user }));
        inputRef.value = '';
    }
};
let initIndex = () => {
    console.log(2);
};
checkUserHasData();
initIndex();
//# sourceMappingURL=func.js.map