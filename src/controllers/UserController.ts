import bcrypt from "bcrypt-nodejs";
import uniqid from 'uniqid';
import * as jwt from "jsonwebtoken";
import {User} from "../entities/User";
import * as neo4j from 'neo4j-driver'
import {AuthData} from "../entities/AuthData";
import {Driver} from "neo4j-driver/types/v1/driver";
import {sendEmail} from "../util/sendEmail";
import {confirmUserPrefix, forgotPasswordPrefix} from "../util/tokenConstants";
import {Upload, uploadFileToS3} from "../lib/AWS";
import {getDecodedToken} from "../auth/isAuth";
import {JWT_SECRET} from "../util/secrets";
import NotificationType from "../enums/NotificationType";
import {Notification} from "../entities/Notification";

class UserController{
    private user: string = process.env.NEO4J_USER;
    private password: string = process.env.NEO4J_PASSWORD;
    private host: string = process.env.NEO4J_IP;

    public driver: Driver = neo4j.v1.driver(
        "bolt://" + this.host,
        neo4j.v1.auth.basic(this.user, this.password),
        {encrypted: 'ENCRYPTION_OFF'})

    public async hashPassword(password: string) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(12, (error, salt) => {
                if (error) return reject(error);
                bcrypt.hash(password, salt, null,
                    (error, hash) => error ? reject(error) : resolve(hash)
                );
            });
        });
    }

    public async login(email: string, password: string): Promise<AuthData> {
        const session = this.driver.session()
        return session.run('MATCH (n { email: \'' + email + '\' }) RETURN n')
            .then(result => {
                session.close();
                if(result.records.length == 0) throw new Error('User does not exist!');
                let user = result.records[0]["_fields"][0]['properties'];
                const isEqual = bcrypt.compareSync(password, user.password);
                if(!isEqual) {
                    this.driver.close();
                    throw new Error('Incorrect password!');
                }
                // else if(!user.confirmed){
                //     throw new Error('Please confirm your email.');
                // }
                else {
                    const token = jwt.sign({userId: user.userId, email: user.email}, JWT_SECRET,{expiresIn: '1h'});
                    this.driver.close();
                    return { accessToken: token, userId: user.userId, expirationInHours: 1 }
                }
            })
            .catch(error => {
                session.close();
                console.log(error);
                this.driver.close()
                return error;
            });
    }

    public async confirmUser(token: string): Promise<Boolean> {
        const decodedToken: AuthData = getDecodedToken(confirmUserPrefix, token);
        if(!decodedToken || decodedToken.userId == null) throw new Error('Not authorized!');
        let cypher: string =
            'MATCH (n:User) WHERE n.userId = "' + decodedToken.userId + '" ' +
            'SET n.confirmed = true ' +
            'RETURN n';
        const session = this.driver.session()
        return session.run(cypher)
            .then(() => {
                session.close();
                this.driver.close();
                return true;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async createUserNotification(data: any): Promise<Boolean> {
        data['createdAt'] = Date.now();
        data['notificationId'] = "notification" + uniqid();
        let cypher: string =
            'match(u:User) where u.userId="' + data['userId'] + '"' +
            ' create (u)-[r:HAS_NOTIFICATION]->(n:Notification{';
        const keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            cypher += keys[i] + ": \'" + data[keys[i]] + "\'";
            if(!(i == keys.length - 1)) cypher += ",";
        }
        cypher += "})";
        const session = this.driver.session()
        return session.run(cypher)
            .then(() => {
                session.close();
                this.driver.close();
                return true;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async getUserNotifications(userId: string): Promise<Notification[]> {
        let notifications: any = [];
        let cypher: string =
            'Match(u:User)-[:HAS_NOTIFICATION]->(n:Notification) where u.userId = "' + userId +
            '" with n order by n.createdAt limit 10 return n';
        const session = this.driver.session()
        return session.run(cypher)
            .then(result => {
                session.close();
                result.records.forEach(record => {
                    notifications.push(record.toObject()["n"]["properties"]);
                })
                this.driver.close();
                return notifications;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async changePassword(token: string, password: string): Promise<Boolean> {
        const decodedToken: AuthData = getDecodedToken(forgotPasswordPrefix, token);
        if(!decodedToken || decodedToken.userId == null) throw new Error('Not authorized!');
        const hashedPassword = await(this.hashPassword(password));
        if(hashedPassword !== null){
            let cypher: string =
                'MATCH (n:User) WHERE n.userId = "' + decodedToken.userId + '" ' +
                'SET n.password = "' + hashedPassword + '" ' +
                'RETURN n';
            const session = this.driver.session()
            return session.run(cypher)
                .then(() => {
                    session.close();
                    this.driver.close();
                    return true;
                })
                .catch(error => {
                    session.close();
                    this.driver.close()
                    throw new Error(error);
                });
        }
    }

    public async registerUser(data: any, picture?: Upload): Promise<Boolean> {
        await this.getUserById(data['userId']).then(users => {
            if(users.length == 1){
                throw new Error('User already exists!');
            }
        });
        if(picture){
            try{
                data = await uploadFileToS3(data, picture, "classi-profile-pictures");
            }
            catch(err){
                throw new Error(err);
            }
        }
        data['createdAt'] = Date.now();
        data['following'] = [];
        data['followers'] = [];
        data['classHistory'] = [];
        data['registeredClasses'] = [];
        const hash = await(this.hashPassword(data['password']));
        let cypher = "CREATE (n:User { "
        const keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            if(keys[i] == 'password'){
                cypher += keys[i] + ": \'" + hash + "\'";
            }
            else {
                cypher += keys[i] + ": \'" + data[keys[i]] + "\'";
            }
            if(!(i == keys.length - 1)) cypher += ",";
        }
        cypher += "})";
        const session = this.driver.session()
        return session.run(cypher)
            .then(() => {
                session.close();
                this.driver.close();
                const token = confirmUserPrefix
                    + jwt.sign({userId: data['userId']}, JWT_SECRET,{expiresIn: '1h'});
                const url = `http://localhost:3000/user/confirm/${token}`
                console.log("PTOKEN: " + token);
                sendEmail(data['email'], url);
                return true;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async forgotPassword(email: string): Promise<Boolean> {
        const session = this.driver.session()
        return session.run('MATCH (n { email: \'' + email + '\' }) RETURN n')
            .then(result => {
                session.close();
                if(result.records.length !== 1){
                    return true; //dont want to notify that the email doesnt exist for security reasons
                }
                const user = result.records[0].toObject()["n"]["properties"]
                const token = forgotPasswordPrefix
                    + jwt.sign({userId: user.userId}, JWT_SECRET,{expiresIn: '1h'});
                const url = `http://localhost:3000/user/change-password/${token}`
                console.log("TOKEN: " + token);
                sendEmail(email, url);
                this.driver.close();
                return true;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async getAllUsers(): Promise<User[]> {
        let users: any = [];
        const session = this.driver.session()
        return session.run('MATCH (n:User) RETURN n')
            .then(result => {
                session.close();
                result.records.forEach(record => {
                    users.push(record.toObject()["n"]["properties"]);
                })
                this.driver.close();
                return users;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async getUserById(userId: string): Promise<User[]> {
        let users: any = [];
        const session = this.driver.session()
        return session.run('MATCH (n { userId: \'' + userId + '\' }) RETURN n')
            .then(result => {
                session.close();
                result.records.forEach(record => {
                    users.push(record.toObject()["n"]["properties"]);
                })
                this.driver.close();
                return users;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async getUserFollowers(userId: string): Promise<User[]> {
        let users: any = [];
        const session = this.driver.session()
        return session.run(
            'MATCH (a:User),(b:User) WHERE ' +
            'b.userId = \'' + userId + '\' ' +
            'MATCH (a)-[r:FOLLOWS]->(b) RETURN a')
            .then(result => {
                session.close();
                result.records.forEach(record => {
                    users.push(record.toObject()["a"]["properties"]);
                })
                this.driver.close();
                return users;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async getNumFollowers(userId: string): Promise<number> {
        const session = this.driver.session()
        return session.run('MATCH ()-[r:FOLLOWS]->(n) WHERE n.userId = \'' + userId + '\' RETURN COUNT(r)')
            .then(result => {
                session.close();
                this.driver.close();
                return result.records[0].toObject()["COUNT(r)"]['low'];
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }

    public async toggleFollow(userId: string, followedUser: string, isUnfollow: boolean): Promise<Boolean> {
        if(userId !== followedUser){
            const cypher: string =
                'MATCH (u:User), (p:User) WHERE u.userId = ' +
                '"' + userId + '" AND p.userId = "' + followedUser + '"' +
                ' CREATE (u)-[:FOLLOWS]->(p) WITH u, p MATCH (u)-[r:FOLLOWS]->(p), (u)-[:FOLLOWS]->(p) DELETE r'
            const session = this.driver.session()
            return session.run(cypher)
                .then(() => {
                    session.close();
                    this.driver.close();
                    if(!isUnfollow){
                        try {
                            this.createUserNotification({
                                userId: followedUser,
                                triggeringUserId: userId,
                                notificationType: NotificationType.New_Follower
                            });
                        }
                        catch(err){
                            throw new Error(err);
                        }
                    }
                    return true;
                })
                .catch(error => {
                    session.close();
                    this.driver.close()
                    throw new Error(error);
                });
        }
    }

    public async updateUser(userId: string, data?: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        //todo
        return null;
    }

    public async deleteUserById(userId: string): Promise<Boolean> {
        const session = this.driver.session()
        return session.run('MATCH (n { userId: \'' + userId + '\' }) DELETE n')
            .then(() => {
                session.close();
                this.driver.close();
                return true;
            })
            .catch(error => {
                session.close();
                this.driver.close()
                throw new Error(error);
            });
    }
}

export default UserController;
