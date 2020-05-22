"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const fs = require("fs");
const LobbyHandler_1 = require("./logic/LobbyHandler");
// Create a new express app instance
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/lobbies', (req, res) => {
    const { key, user, avatar } = req.query;
    console.log(req.query);
    LobbyHandler_1.LobbyHandler.addUser(key, '', '');
    res.render(__dirname + '/views/lobbies/index.html');
});
app.get('/', (req, res) => {
    res.render(__dirname + '/views/index.html', { host: `${IP}:${PORT}` });
});
const peers = [];
wsServer.on('connection', (ws) => {
    peers.push(ws);
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
        const response = JSON.parse(message);
        //log the received message and send it back to the client
        switch (response.type) {
            case 'chat_message': {
                peers.forEach((wsClient) => wsClient.send(JSON.stringify({ type: 'chat_message', message: response.message, user: response.user })));
            }
        }
    });
    //send immediatly a feedback to the incoming connection
    ws.send(JSON.stringify({ type: 'connected', message: 'The connection is succeed' }));
});
server.listen(PORT, () => {
    console.log(`Server is listening on address - ${IP}:${PORT}`);
});
console.log('Server running on http://%s:%s', IP, PORT);
exports.HOST = `${IP}:${PORT}`;
fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
    console.log('Writing generated-host. Error?:' + err);
});
//# sourceMappingURL=index.js.map