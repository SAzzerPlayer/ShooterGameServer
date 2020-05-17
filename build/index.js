"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// Create a new express app instance
var app = express_1.default();
var PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || 'localhost';
app.use(express_1.default.static(__dirname + '/'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});
app.listen(PORT, function () { console.log("Server is listening on address - " + IP + ":" + PORT); });
console.log('Server running on http://%s:%s', IP, PORT);
