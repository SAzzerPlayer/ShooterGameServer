"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const WSServerCore_1 = require("./logic/WSServerCore");
const ServerUserContainer_1 = require("./logic/WSServerCore/ServerUserContainer");
// Create a new express app instance
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
//
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/create_user', (req, res) => {
    const { key, name, avatar } = req.query;
    ServerUserContainer_1.ServerUserContainer.register({
        key: key,
        name: name,
        avatar: Number(avatar),
    });
    res.redirect('lobbies');
});
app.get('/lobbies', (req, res) => {
    res.render(__dirname + '/views/lobbies/index.html');
});
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.html', { host: `${IP}:${PORT}` });
});
wsServer.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    WSServerCore_1.default.peerSockets.push(ws);
    ws.on('message', (message) => {
        WSServerCore_1.default.handleMessage(message, ws);
    });
    ws.on('error', (err) => {
        console.log('[Socket error]:', err);
    });
    ws.on('close', () => {
        const user = ServerUserContainer_1.ServerUserContainer.getUserBy(ws, 'socket');
        setTimeout(() => {
            var _a, _b;
            if (user && ((_a = user === null || user === void 0 ? void 0 : user.socket) === null || _a === void 0 ? void 0 : _a.readyState) === ((_b = user === null || user === void 0 ? void 0 : user.socket) === null || _b === void 0 ? void 0 : _b.CLOSED)) {
                ServerUserContainer_1.ServerUserContainer.removeUser(user.key);
                console.log(`Socket was closed. User ${user === null || user === void 0 ? void 0 : user.name} has been left the server`);
            }
        }, 10000);
    });
});
exports.HOST = `${IP}:${PORT}`;
server.listen(PORT, () => {
    console.log(`Server is listening on address - ${exports.HOST}`);
});
fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
    console.log('Writing generated-host. Error?:' + err);
});
//# sourceMappingURL=index.js.map