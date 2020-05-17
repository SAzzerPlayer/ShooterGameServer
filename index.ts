import express from 'express';
import ws from 'ws';
// Create a new express app instance
const app = express();
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const IP   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
app.use(express.static(__dirname+'/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.listen(PORT, () => {console.log(`Server is listening on address - ${IP}:${PORT}`)});
console.log('Server running on http://%s:%s', IP, PORT);
