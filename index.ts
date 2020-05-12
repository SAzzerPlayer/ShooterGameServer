import express = require('express');
import upd from './path/path';
// Create a new express app instance
const app: express.Application = express();
const port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
const ip   = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, () => {console.log(upd)});
console.log('Server running on http://%s:%s', ip, port);
