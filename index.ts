import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as fs from 'fs';
import WSServerCore from './logic/WSServerCore';

// Create a new express app instance
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
//
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/create_user', (req, res) => {
  const {key, user, avatar} = req.query;
  res.redirect('lobbies');
});
app.get('/lobbies', (req, res) => {
  res.render(__dirname + '/views/lobbies/index.html');
});
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.html', {host: `${IP}:${PORT}`});
});
//
const peers = [] as WebSocket[];
const messages = [] as Array<{message: string; user: string}>;
wsServer.on('connection', (ws: WebSocket) => {
  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    const response = JSON.parse(message);
    console.log(response);
    //log the received message and send it back to the client
    switch (response.type) {
      case 'chat_message': {
        console.dir(response);
        messages.push({message: response.message, user: response.user});
        peers.forEach((wsClient) =>
          wsClient.send(
            JSON.stringify({type: 'chat_message', message: response.message, user: response.user}),
          ),
        );
        break;
      }
      case 'history': {
        ws.send(JSON.stringify({type: 'messages_history', value: messages}));
        break;
      }
    }
  });
  peers.push(ws);
  //send immediatly a feedback to the incoming connection
});
export const HOST = `${IP}:${PORT}`;
server.listen(PORT, () => {
  console.log(`Server is listening on address - ${HOST}`);
});
console.log('Server running on http://%s:%s', IP, PORT);

fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
  console.log('Writing generated-host. Error?:' + err);
});
