"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const uniqid_1 = __importDefault(require("uniqid"));
const jwt = __importStar(require("jsonwebtoken"));
const neo4j = __importStar(require("neo4j-driver"));
const sendEmail_1 = require("../util/sendEmail");
const tokenConstants_1 = require("../util/tokenConstants");
const isAuth_1 = require("../auth/isAuth");
const secrets_1 = require("../util/secrets");
const NotificationType_1 = __importDefault(require("../enums/NotificationType"));
const AccountType_1 = __importDefault(require("../enums/AccountType"));
class UserController {
    constructor() {
        this.user = process.env.NEO4J_USER;
        this.password = process.env.NEO4J_PASSWORD;
        this.host = process.env.NEO4J_IP;
        this.driver = neo4j.v1.driver("bolt://" + this.host, neo4j.v1.auth.basic(this.user, this.password), { encrypted: 'ENCRYPTION_OFF' });
        this.session = this.driver.session();
    }
    async hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt_nodejs_1.default.genSalt(12, (error, salt) => {
                if (error)
                    return reject(error);
                bcrypt_nodejs_1.default.hash(password, salt, null, (error, hash) => error ? reject(error) : resolve(hash));
            });
        });
    }
    async login(email, password) {
        return this.session.run('MATCH (n { email: \'' + email + '\' }) RETURN n')
            .then(result => {
            if (result.records.length == 0)
                throw new Error('User does not exist!');
            let user = result.records[0]["_fields"][0]['properties'];
            const isEqual = bcrypt_nodejs_1.default.compareSync(password, user.password);
            if (!isEqual) {
                throw new Error('Incorrect password!');
            }
            else {
                const token = jwt.sign({ userId: user.userId, email: user.email }, secrets_1.JWT_SECRET, { expiresIn: '1h' });
                return { accessToken: token, userId: user.userId, expirationInHours: 1 };
            }
        })
            .catch(error => {
            console.log(error);
            return error;
        });
    }
    async confirmUser(token) {
        const decodedToken = isAuth_1.getDecodedToken(tokenConstants_1.confirmUserPrefix, token);
        if (!decodedToken || decodedToken.userId == null)
            throw new Error('Not authorized!');
        let cypher = 'MATCH (n:User) WHERE n.userId = "' + decodedToken.userId + '" ' +
            'SET n.confirmed = true ' +
            'RETURN n';
        return this.session.run(cypher)
            .then(() => {
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async createUserNotification(data) {
        data['createdAt'] = Date.now();
        data['notificationId'] = "notification" + uniqid_1.default();
        if (data['triggeringUserId']) {
            const userData = await this.getUserById(data['triggeringUserId']);
            data['triggeringUserS3Url'] = userData[0]['s3url'];
        }
        let cypher = 'match(u:User) where u.userId="' + data['userId'] + '"' +
            ' create (u)-[r:HAS_NOTIFICATION]->(n:Notification{';
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            cypher += keys[i] + ": \'" + data[keys[i]] + "\'";
            if (!(i == keys.length - 1))
                cypher += ",";
        }
        cypher += "})";
        return this.session.run(cypher)
            .then(() => {
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getUserNotifications(userId) {
        let notifications = [];
        let cypher = 'Match(u:User)-[:HAS_NOTIFICATION]->(n:Notification) where u.userId = "' + userId +
            '" with n order by n.createdAt limit 10 return n';
        return this.session.run(cypher)
            .then(result => {
            result.records.forEach(record => {
                notifications.push(record.toObject()["n"]["properties"]);
            });
            return notifications;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async changePassword(token, password) {
        const decodedToken = isAuth_1.getDecodedToken(tokenConstants_1.forgotPasswordPrefix, token);
        if (!decodedToken || decodedToken.userId == null)
            throw new Error('Not authorized!');
        const hashedPassword = await (this.hashPassword(password));
        if (hashedPassword !== null) {
            let cypher = 'MATCH (n:User) WHERE n.userId = "' + decodedToken.userId + '" ' +
                'SET n.password = "' + hashedPassword + '" ' +
                'RETURN n';
            return this.session.run(cypher)
                .then(() => {
                return true;
            })
                .catch(error => {
                throw new Error(error);
            });
        }
    }
    async registerUser(data) {
        await this.getUserById(data['userId'], data['email']).then(users => {
            if (users.length >= 1) {
                throw new Error('Username or email already exists!');
            }
        });
        data['createdAt'] = Date.now();
        data['accountType'] = AccountType_1.default.Free;
        const hash = await (this.hashPassword(data['password']));
        let cypher = "CREATE (n:User { ";
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            if (keys[i] == 'password') {
                cypher += keys[i] + ": \'" + hash + "\'";
            }
            else {
                cypher += keys[i] + ": \'" + data[keys[i]] + "\'";
            }
            if (!(i == keys.length - 1))
                cypher += ",";
        }
        cypher += "})";
        return this.session.run(cypher)
            .then(() => {
            const token = tokenConstants_1.confirmUserPrefix
                + jwt.sign({ userId: data['userId'] }, secrets_1.JWT_SECRET, { expiresIn: '1h' });
            const url = `http://localhost:3000/user/confirm/${token}`;
            sendEmail_1.sendEmail(data['email'], url);
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async forgotPassword(email) {
        return this.session.run('MATCH (n { email: \'' + email + '\' }) RETURN n')
            .then(result => {
            if (result.records.length !== 1) {
                return true;
            }
            const user = result.records[0].toObject()["n"]["properties"];
            const token = tokenConstants_1.forgotPasswordPrefix
                + jwt.sign({ userId: user.userId }, secrets_1.JWT_SECRET, { expiresIn: '1h' });
            const url = `http://localhost:3000/user/change-password/${token}`;
            sendEmail_1.sendEmail(email, url);
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getAllUsers() {
        let users = [];
        return this.session.run('MATCH (n:User) RETURN n')
            .then(result => {
            result.records.forEach(record => {
                users.push(record.toObject()["n"]["properties"]);
            });
            return users;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getUserById(userId, email) {
        let cypher;
        if (email != null) {
            cypher = 'MATCH (n:User) WHERE n.userId = \'' + userId + '\' OR n.email = \'' + email + '\' RETURN n';
        }
        else {
            cypher = 'MATCH (n:User { userId: \'' + userId + '\' }) RETURN n';
        }
        let users = [];
        return this.session.run(cypher)
            .then(result => {
            result.records.forEach(record => {
                users.push(record.toObject()["n"]["properties"]);
            });
            return users;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getUserFollowers(userId) {
        let users = [];
        return this.session.run('MATCH (a:User),(b:User) WHERE ' +
            'b.userId = \'' + userId + '\' ' +
            'MATCH (a)-[r:FOLLOWS]->(b) RETURN a')
            .then(result => {
            result.records.forEach(record => {
                users.push(record.toObject()["a"]["properties"]);
            });
            return users;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getUserFollowing(userId) {
        let users = [];
        return this.session.run('MATCH (a:User),(b:User) WHERE ' +
            'a.userId = \'' + userId + '\' ' +
            'MATCH (a)-[r:FOLLOWS]->(b) RETURN b')
            .then(result => {
            result.records.forEach(record => {
                users.push(record.toObject()["b"]["properties"]);
            });
            return users;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async getNumFollowers(userId) {
        return this.session.run('MATCH ()-[r:FOLLOWS]->(n) WHERE n.userId = \'' + userId + '\' RETURN COUNT(r)')
            .then(result => {
            return result.records[0].toObject()["COUNT(r)"]['low'];
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async toggleFollow(userId, followedUser, isUnfollow) {
        if (userId !== followedUser) {
            const cypher = 'MATCH (u:User), (p:User) WHERE u.userId = ' +
                '"' + userId + '" AND p.userId = "' + followedUser + '"' +
                ' CREATE (u)-[:FOLLOWS]->(p) WITH u, p MATCH (u)-[r:FOLLOWS]->(p), (u)-[:FOLLOWS]->(p) DELETE r';
            return this.session.run(cypher)
                .then(() => {
                if (!isUnfollow) {
                    try {
                        this.createUserNotification({
                            userId: followedUser,
                            triggeringUserId: userId,
                            notificationType: NotificationType_1.default.New_Follower
                        });
                    }
                    catch (err) {
                        throw new Error(err);
                    }
                }
                return true;
            })
                .catch(error => {
                throw new Error(error);
            });
        }
    }
    async updateUser(userId, data) {
        let cypher = 'MERGE (n:User { userId: \'' + userId + '\' }) SET';
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            cypher += " n." + keys[i] + " = '" + data[keys[i]] + "'";
            if (!(i == keys.length - 1))
                cypher += ",";
        }
        cypher += ' RETURN n';
        return this.session.run(cypher)
            .then(() => {
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
    async deleteUserById(userId) {
        return this.session.run('MATCH (n:User { userId: \'' + userId + '\' }) DELETE n')
            .then(() => {
            return true;
        })
            .catch(error => {
            throw new Error(error);
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map