"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.produceAction = (type, data, senderSocket) => {
    console.log(`[Received message]: ${type}`);
    switch (type) {
        case 'MAIN/BIND_USER': {
            break;
        }
        default: {
            console.log(`[Error]: Undefined type of message!`);
            break;
        }
    }
};
//# sourceMappingURL=index.js.map