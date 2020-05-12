import express = require('express');
import upd from './path/path';
// Create a new express app instance
const app: express.Application = express();
console.log(upd);
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('App is listening on port 3000!');
});
