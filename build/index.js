"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocketModule = require("ws");
const fs = require("fs");
const core_1 = require("./core");
//
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocketModule.Server({ server });
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
//
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//
app.get('/create_user', (req, res) => {
    const { key, username, avatar } = req.query;
    core_1.GameServer.getUserCollection().register({
        key: key,
        username: username,
        avatar: Number(avatar),
    });
    res.redirect('lobbies');
});
app.get('/room', (req, res) => {
    res.render(__dirname + '/views/game/index.html');
});
app.get('/direct_to_room', (req, res) => {
    const { roomId, user } = req.query;
    res.redirect('/room');
});
app.get('/lobbies', (req, res) => {
    res.render(__dirname + '/views/lobbies/index.html');
});
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.html', { host: `${IP}:${PORT}` });
});
//
wsServer.on('connection', (ws) => {
    ws.on('message', (message) => {
        //@ts-ignore
        core_1.GameServer.handleMessage(message, ws);
    });
    ws.on('error', (err) => {
        console.log('[Socket error]:', err);
    });
});
exports.HOST = `${IP}:${PORT}`;
server.listen(PORT, () => {
    console.log(`Server is listening on address - ${exports.HOST}`);
    core_1.GameServer.startPingPong();
});
fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
    console.log('Writing generated-host. Error?:' + err);
});
//# sourceMappingURL=index.js.map