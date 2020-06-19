"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_1 = require("../shared");
const game_1 = require("../actions/game");
const index_1 = require("../index");
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function getDistance(dot1, dot2) {
    return Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2));
}
var EGameCollectionStatus;
(function (EGameCollectionStatus) {
    EGameCollectionStatus["WAITING"] = "WAITING";
    EGameCollectionStatus["PREPARING"] = "PREPARING";
    EGameCollectionStatus["STAGE"] = "STAGE";
    EGameCollectionStatus["END"] = "END";
})(EGameCollectionStatus = exports.EGameCollectionStatus || (exports.EGameCollectionStatus = {}));
class ServerUserGamer {
    constructor(health, power, username) {
        this.setHealth = (health) => {
            this.health = health;
        };
        this.getDamage = (damage) => {
            if (this.health - damage <= 0) {
                this.health = 0;
            }
            else {
                this.health -= damage;
            }
        };
        this.getPower = () => this.power;
        this.shot = () => {
            this.energy -= 10;
        };
        this.addReward = (reward) => {
            this.reward += reward;
        };
        this.addEnemy = () => {
            this.enemies += 1;
        };
        this.updateEnergy = () => {
            if (this.energy < 100) {
                this.energy += 10;
            }
        };
        this.updateHealth = () => {
            if (this.health + 5 < this.maxHealth) {
                this.health += 5;
            }
        };
        this.maxHealth = health;
        this.health = health;
        this.energy = 100;
        this.power = power;
        this.username = username;
        this.reward = 0;
        this.enemies = 0;
    }
}
exports.ServerUserGamer = ServerUserGamer;
class ServerEnemy {
    constructor(width, height, health, power, body, reward, name = '') {
        this.setHealth = (health) => {
            this.health = health;
        };
        this.getHealth = () => this.health;
        this.getDamage = (power) => {
            if (this.health - power > 0) {
                this.health -= power;
            }
            else {
                this.health = 0;
            }
        };
        this.setPosition = (position) => {
            this.position = position;
        };
        this.autoMove = (gameField) => {
            const { xStart, xEnd, yStart, yEnd } = gameField;
            const [moveX, moveY] = [getRandomInt(8) - 4, getRandomInt(8) - 4];
            const { position } = this;
            if (position.x + moveX >= xEnd) {
                position.x -= moveX;
            }
            else if (position.x - moveX <= xStart) {
                position.x += moveX;
            }
            else {
                position.x += moveX;
            }
            if (position.y + moveY >= yEnd) {
                position.y -= moveY;
            }
            else if (position.y - moveY <= yStart) {
                position.y += moveY;
            }
            else {
                position.y += moveY;
            }
        };
        this.shot = (dot, damage) => {
            for (const body of this.body) {
                const bodyPosition = {
                    x: body.position.x + this.position.x,
                    y: body.position.y + this.position.y,
                };
                const distance = getDistance(dot, bodyPosition);
                if (distance < body.radius) {
                    this.getDamage((distance / body.radius) * damage);
                    return true;
                }
            }
            return false;
        };
        this.clone = () => {
            return new ServerEnemy(this.width, this.height, this.health, this.power, this.body, this.reward);
        };
        this.health = health;
        this.power = power;
        this.body = body;
        this.position = { x: 50, y: 50 };
        this.width = width;
        this.height = height;
        this.reward = reward;
        this.name = name;
    }
}
exports.ServerEnemy = ServerEnemy;
const Enemies = {
    Light: new ServerEnemy(24, 24, 8, 4, [{ position: { x: 12, y: 12 }, radius: 12 }], 20, 'Light'),
    Medium: new ServerEnemy(36, 36, 16, 6, [{ position: { x: 18, y: 18 }, radius: 18 }], 50, 'Medium'),
    Large: new ServerEnemy(48, 48, 40, 10, [{ position: { x: 24, y: 24 }, radius: 24 }], 100, 'Large'),
};
class GameCollection {
    constructor(roomId, complexity, field, users) {
        this.generateEnemies = () => {
            const enemyType = getRandomInt(3);
            const enemiesType = { 0: Enemies.Light, 1: Enemies.Medium, 2: Enemies.Large };
            const newEnemy = enemiesType[enemyType].clone();
            const x = getRandomInt(this.field.xEnd - this.field.xStart) + this.field.xStart;
            const y = getRandomInt(this.field.yEnd - this.field.yStart) + this.field.yStart;
            newEnemy.setPosition({ x, y });
            this.enemies.push(newEnemy);
        };
        this.moveEnemies = () => {
            for (let enemy of this.enemies) {
                enemy.autoMove(this.field);
            }
        };
        this.healthGamers = () => {
            for (let gamer of Object.keys(this.gamers)) {
                //@ts-ignore
                if (this.gamers[gamer] && this.gamers[gamer].health > 1) {
                    //@ts-ignore
                    this.gamers[gamer].updateHealth();
                }
            }
        };
        this.updateGamerEnergy = () => {
            for (let gamer of Object.keys(this.gamers)) {
                //@ts-ignore
                this.gamers[gamer].updateEnergy();
            }
        };
        this.attackEnemies = () => {
            const procent = getRandomInt(100);
            const attackModify = (this.complexity === shared_1.EServerRoomComplexity.Easy && 0.5) ||
                (this.complexity === shared_1.EServerRoomComplexity.Medium && 1) ||
                (this.complexity === shared_1.EServerRoomComplexity.Hard && 1.25) ||
                (this.complexity === shared_1.EServerRoomComplexity.Impossible && 1.75) ||
                1;
            for (let enemy of this.enemies) {
                if (procent < 50) {
                    //@ts-ignore
                    const gamer = this.gamers[getRandomInt(Object.keys(this.gamers).length) + 1];
                    setTimeout(() => {
                        gamer.getDamage(enemy.power * attackModify);
                    }, 500);
                }
            }
        };
        this.shotByGamer = (position, username) => {
            const gamer = this.gamers[
            //@ts-ignore
            Object.keys(this.gamers).find(
            //@ts-ignore
            (currentGamer) => this.gamers[currentGamer].username === username)];
            if (gamer && gamer.health > 0 && gamer.energy >= 10) {
                gamer.shot();
                for (let enemy of this.enemies) {
                    const attackModify = (this.complexity === shared_1.EServerRoomComplexity.Easy && 1.75) ||
                        (this.complexity === shared_1.EServerRoomComplexity.Medium && 1) ||
                        (this.complexity === shared_1.EServerRoomComplexity.Hard && 0.65) ||
                        (this.complexity === shared_1.EServerRoomComplexity.Impossible && 0.4) ||
                        1;
                    const successHit = enemy.shot(position, gamer.getPower() * attackModify);
                    if (successHit) {
                        if (enemy.health <= 1) {
                            this.enemies.splice(this.enemies.indexOf(enemy), 1);
                            gamer.addEnemy();
                            gamer.addReward(enemy.reward);
                        }
                        break;
                    }
                }
            }
        };
        this.statsUpdate = () => { };
        this.enemies = [];
        const gamers = users.map((user) => {
            return new ServerUserGamer(100, 10, user.username);
        });
        this.gamers = {};
        gamers.forEach((gamer, index) => {
            //@ts-ignore
            this.gamers[index + 1] = gamer;
        });
        this.complexity = shared_1.EServerRoomComplexity.Easy;
        this.stage = 1;
        this.status = EGameCollectionStatus.WAITING;
        this.field = field;
        this.roomId = roomId;
        this.time = 0;
    }
    start() {
        this.time = 15;
        const generateModify = (this.complexity === shared_1.EServerRoomComplexity.Easy && 1.1) ||
            (this.complexity === shared_1.EServerRoomComplexity.Medium && 1) ||
            (this.complexity === shared_1.EServerRoomComplexity.Hard && 0.8) ||
            (this.complexity === shared_1.EServerRoomComplexity.Impossible && 0.65) ||
            1;
        const stageStatusStart = () => {
            this.time = 40 + this.stage * 20;
            this.generateTimer = setInterval(() => {
                this.generateEnemies();
            }, 4000 * generateModify);
            this.moveTimer = setInterval(() => {
                this.moveEnemies();
            }, 300);
            this.healthTimer = setInterval(() => {
                this.healthGamers();
            }, 10000);
            this.energyTimer = setInterval(() => {
                this.updateGamerEnergy();
            }, 1000);
            this.attackEnemyTimer = setInterval(() => {
                this.attackEnemies();
            }, 2500);
        };
        this.statsTimer = setInterval(() => {
            this.time -= 0.5;
            let activeGamers = 0;
            for (const gamer of [1, 2, 3, 4]) {
                //@ts-ignore
                const userG = this.gamers[gamer];
                if ((userG === null || userG === void 0 ? void 0 : userG.health) > 1)
                    activeGamers += 1;
            }
            if (activeGamers === 0) {
                this.status = EGameCollectionStatus.END;
                this.time = 0;
            }
            console.log(this.status);
            game_1.gameUpdate(this.roomId);
            if (this.time <= 0) {
                clearInterval(this.energyTimer);
                clearInterval(this.healthTimer);
                clearInterval(this.generateTimer);
                clearInterval(this.moveTimer);
                clearInterval(this.attackEnemyTimer);
                this.enemies = [];
                switch (this.status) {
                    case EGameCollectionStatus.PREPARING: {
                        this.status = EGameCollectionStatus.STAGE;
                        stageStatusStart();
                        this.stage += 1;
                        break;
                    }
                    case EGameCollectionStatus.STAGE: {
                        this.status = EGameCollectionStatus.PREPARING;
                        this.time = 20;
                        break;
                    }
                    case EGameCollectionStatus.END: {
                        clearInterval(this.statsTimer);
                        game_1.gameUpdate(this.roomId);
                        index_1.GameServer.getRoomsCollection().deleteRoom(this.roomId);
                        break;
                    }
                }
            }
        }, 500);
        this.status = EGameCollectionStatus.PREPARING;
    }
}
exports.GameCollection = GameCollection;
//# sourceMappingURL=GameCollection.js.map