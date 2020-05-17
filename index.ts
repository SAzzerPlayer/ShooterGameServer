import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as fs from 'fs';
// Create a new express app instance
const app = express();
const server = http.createServer(app);
const wsServer = new WebSocket.Server({server});
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
app.use(express.static(__dirname + '/'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.get('/', function (req, res) {
  res.render(__dirname + '/views/index.html', {host: `${IP}:${PORT}`});
});
wsServer.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});
server.listen(PORT, () => {
  console.log(`Server is listening on address - ${IP}:${PORT}`);
});
console.log('Server running on http://%s:%s', IP, PORT);

export const HOST = `${IP}:${PORT}`;

fs.writeFile('./build/generated-host.js', `const HOST = '${IP}:${PORT}';`, (err) => {
    console.log("Writing generated-host. Error?:"+err);
});
