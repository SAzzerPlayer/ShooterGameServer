"use strict";
// @ts-ignore
const socket = new WebSocket(`ws://http://shooter-game-server-lab2game.apps.us-east-1.starter.openshift-online.com/`);
const onClickH1 = () => {
    socket.send('User clicked on h1');
};
socket.onopen = function (e) {
    console.log('[open] Соединение установлено');
    console.log('Отправляем данные на сервер');
    socket.send('Меня зовут Джон');
};
socket.onmessage = function (event) {
    console.log(`[message] Данные получены с сервера: ${event.data}`);
};
socket.onclose = function (event) {
    if (event.wasClean) {
        console.log(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    }
    else {
        // например, сервер убил процесс или сеть недоступна
        // обычно в этом случае event.code 1006
        console.log('[close] Соединение прервано');
    }
};
socket.onerror = function (error) {
    console.log(`[error] ${error}`);
};
//# sourceMappingURL=func.js.map