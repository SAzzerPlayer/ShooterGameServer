import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as fs from 'fs';
import WSServerCore from './logic/WSServerCore';
import {ServerUserContainer} from './logic/WSServerCore/ServerUserContainer';
import {TTypeUserAvatar} from './logic/WSServerCore/ServerUserContainer';

//
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
//
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//
app.get('/create_user', (req, res) => {
  const {key, name, avatar} = req.query;
  ServerUserContainer.register({
    key: key as string,
    name: name as string,
    avatar: Number(avatar) as TTypeUserAvatar,
  });
  res.redirect('lobbies');
});
app.get('/lobbies', (req, res) => {
  res.render(__dirname + '/views/lobbies/index.html');
});
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html', {host: `${IP}:${PORT}`});
});
//
wsServer.on('connection', (ws: WebSocket) => {
  WSServerCore.peerSockets.push(ws as any);
  ws.on('message', (message: string) => {
    WSServerCore.handleMessage(message, ws as any);
  });
  ws.on('error', (err) => {
    console.log('[Socket error]:', err);
  });
  ws.on('close', () => {
    const user = ServerUserContainer.getUserBy(ws as any, 'socket');
    setTimeout(() => {
      if (user && user?.socket?.readyState === user?.socket?.CLOSED) {
        ServerUserContainer.removeUser(user.key);
        console.log(`Socket was closed. User ${user?.name} has been left the server`);
      }
    }, 15000);
  });
});

export const HOST = `${IP}:${PORT}`;

server.listen(PORT, () => {
  console.log(`Server is listening on address - ${HOST}`);
});

fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
  console.log('Writing generated-host. Error?:' + err);
});
