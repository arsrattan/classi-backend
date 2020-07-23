import bcrypt from "bcrypt";
import uniqid from "uniqid";
import * as jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { AuthData } from "../entities/AuthData";
import { sendEmail } from "../util/sendEmail";
import {
  confirmUserPrefix,
  forgotPasswordPrefix,
} from "../util/tokenConstants";
import { getDecodedToken } from "../auth/isAuth";
import { JWT_SECRET } from "../util/secrets";
import NotificationType from "../enums/NotificationType";
<<<<<<< Updated upstream
import { Notification } from "../entities/Notification";
=======
import {Notification} from "../entities/Notification";
import Group from "../entities/Group";
>>>>>>> Stashed changes
import AccountType from "../enums/AccountType";
import gremlin from "gremlin";
import { uuid } from "uuidv4";

<<<<<<< Updated upstream
const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const graph = new Graph();
=======
class UserController{
    private user: string = process.env.NEO4J_USER;
    private password: string = process.env.NEO4J_PASSWORD;
    private host: string = process.env.NEO4J_IP;
>>>>>>> Stashed changes

class UserController {
  private g = graph
    .traversal()
    .withRemote(
      new DriverRemoteConnection(
        "wss://neptunedbinstance-cti8rfcktrww.cjqgcta10amy.us-east-1.neptune.amazonaws.com:8182/gremlin",
        {}
      )
    );

  public async hashPassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(12, (error, salt) => {
        if (error) return reject(error);
        bcrypt.hash(password, salt, (error, hash) =>
          error ? reject(error) : resolve(hash)
        );
      });
    });
  }

<<<<<<< Updated upstream
  public async login(username: string, password: string): Promise<AuthData> {
    const data = await this.g.V().limit(1).count().next();
    console.log(`Data: ${data}`);
    return {
      accessToken: "",
      userId: "",
      expirationInHours: 1,
    };
  }
=======
    public async login(userId: string, password: string): Promise<AuthData> {
        const gremlin = require('gremlin');
        const traversal = gremlin.process.AnonymousTraversalSource.traversal;
        const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
        const g = traversal().withRemote(new DriverRemoteConnection(
            'wss://neptunedbinstance-cti8rfcktrww.cjqgcta10amy.us-east-1.neptune.amazonaws.com:8182/gremlin', {})
        );

        return g.V().toList().
            then(data => {
                console.log(data);
                return null;
            }).catch(error => {
                console.log('ERROR', error);
            });
        
        // return this.session.run('MATCH (n { userId: \'' + userId + '\' }) RETURN n')
        //     .then(result => {
        //         if(result.records.length == 0) throw new Error('User does not exist!');
        //         let user = result.records[0]["_fields"][0]['properties'];
        //         if(password == null){
        //             const token = jwt.sign({userId: user.userId, firstName: user.firstName}, JWT_SECRET,{expiresIn: '1h'});
        //             return { accessToken: token, userId: user.userId, expirationInHours: 1 }
        //         }
        //         const isEqual = bcrypt.compareSync(password, user.password);
        //         if(!isEqual) {
        //             throw new Error('Incorrect password!');
        //         }
        //         // else if(!user.confirmed){
        //         //     throw new Error('Please confirm your email.');
        //         // }
        //         else {
        //             const token = jwt.sign({userId: user.userId, firstName: user.firstName}, JWT_SECRET,{expiresIn: '1h'});
        //             return { accessToken: token, userId: user.userId, expirationInHours: 1 }
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         return error;
        //     });
    }
>>>>>>> Stashed changes

  private async emailBelongsToExistingUser(email: string) {
    try {
      const usersWithSameEmail = Number(
        (await this.g.V().hasLabel("user").has("email", email).count().next())
          .value
      );

      return usersWithSameEmail !== 0;
    } catch (err) {
      console.log("Could not check if email belongs to existing user: ", err);
    }
  }

  private async usernameBelongsToExistingUser(username: string) {
    try {
      const usersWithSameUsername = Number(
        (
          await this.g
            .V()
            .hasLabel("user")
            .has("email", username)
            .count()
            .next()
        ).value
      );

      return usersWithSameUsername !== 0;
    } catch (err) {
      console.log(
        "Could not check if username belongs to existing user: ",
        err
      );
    }
  }

<<<<<<< Updated upstream
  public async register(
    email: string,
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    dateOfBirth: string
  ) {
    if ((await this.emailBelongsToExistingUser(email)) === true) {
      throw new Error(
        "The provided email address has already been used to register for another account"
      );
=======
    public async registerUser(data: any): Promise<Boolean> {
        const gremlin = require('gremlin');
        const traversal = gremlin.process.AnonymousTraversalSource.traversal;
        const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
        const g = traversal().withRemote(new DriverRemoteConnection(
            'wss://neptunedbinstance-cti8rfcktrww.cjqgcta10amy.us-east-1.neptune.amazonaws.com:8182/gremlin', {})
        );
        // await this.getUserById(data['userId']).then(users => {
        //     if(users.length >= 1){
        //         throw new Error('Username or email already exists!');
        //     }
        // });
        data['createdAt'] = Date.now();
        data['accountType'] = AccountType.Free;
        const hash = await(this.hashPassword(data['password']));
        const keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            if(keys[i] == 'password'){
                g.addV("person").property('password', hash);
            }
            else {
                g.addV("person").property(keys[i], data[keys[i]]);
            }
        }
        return g.V().next().then(() => {
            //const token = confirmUserPrefix + jwt.sign({userId: data['userId']}, JWT_SECRET,{expiresIn: '1h'});
            //const url = `http://localhost:3000/user/confirm/${token}`
            //sendEmail(data['email'], url);
            return true;
        }).catch(error => {
            throw new Error(error);
        });
>>>>>>> Stashed changes
    }
    if ((await this.usernameBelongsToExistingUser(username)) === true) {
      throw new Error(
        "The provided username has already been used to register for another account"
      );
    }

<<<<<<< Updated upstream
    let encryptedPassword;
    await bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        throw new Error(`Could not hash password: ${err.message}`);
      }
      encryptedPassword = hash;
    });

    console.log(`Encrypted password: ${encryptedPassword}`);

    try {
      const userId = uuid();
      await this.g
        .addV("user")
        .property("userId", userId)
        .property("email", email)
        .property("firstName", firstName)
        .property("lastName", lastName)
        .property("username", username)
        .property("password", encryptedPassword)
        .property("dateOfBirth", dateOfBirth)
        .property("dateCreated", Date.now().toString())
        .property("accountType", AccountType.Free)
        .next();

      const token =
        confirmUserPrefix +
        jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });

      console.log(`Generated token: ${token}`);
    } catch (err) {
      console.log("Could not register new user", err);
=======
    public async getAllUsers(): Promise<User[]> {
        const gremlin = require('gremlin');
        const traversal = gremlin.process.AnonymousTraversalSource.traversal;
        const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
        const g = traversal().withRemote(new DriverRemoteConnection(
            'wss://neptunedbinstance-cti8rfcktrww.cjqgcta10amy.us-east-1.neptune.amazonaws.com:8182/gremlin', {})
        );
        return g.V().toList().
            then(data => {
                console.log(data);
                return data;
            }).catch(error => {
                throw new Error(error);
            });
>>>>>>> Stashed changes
    }
  }

  /*
  public async login(email: string, password: string): Promise<AuthData> {
    return this.session
      .run("MATCH (n { email: '" + email + "' }) RETURN n")
      .then((result) => {
        if (result.records.length == 0) throw new Error("User does not exist!");
        let user = result.records[0]["_fields"][0]["properties"];
        const isEqual = bcrypt.compareSync(password, user.password);
        if (!isEqual) {
          throw new Error("Incorrect password!");
        }
        // else if(!user.confirmed){
        //     throw new Error('Please confirm your email.');
        // }
        else {
          const token = jwt.sign(
            { userId: user.userId, email: user.email },
            JWT_SECRET,
            { expiresIn: "1h" }
          );
          return {
            accessToken: token,
            userId: user.userId,
            expirationInHours: 1,
          };
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  }
*/
//   public async confirmUser(token: string): Promise<Boolean> {
//     const decodedToken: AuthData = getDecodedToken(confirmUserPrefix, token);
//     if (!decodedToken || decodedToken.userId == null)
//       throw new Error("Not authorized!");
//     let cypher: string =
//       'MATCH (n:User) WHERE n.userId = "' +
//       decodedToken.userId +
//       '" ' +
//       "SET n.confirmed = true " +
//       "RETURN n";
//     return this.session
//       .run(cypher)
//       .then(() => {
//         return true;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async createUserNotification(data: any): Promise<Boolean> {
//     data["createdAt"] = Date.now();
//     data["notificationId"] = "notification" + uniqid();
//     if (data["triggeringUserId"]) {
//       const userData = await this.getUserById(data["triggeringUserId"]);
//       data["triggeringUserS3Url"] = userData[0]["s3url"];
//     }
//     let cypher: string =
//       'match(u:User) where u.userId="' +
//       data["userId"] +
//       '"' +
//       " create (u)-[r:HAS_NOTIFICATION]->(n:Notification{";
//     const keys = Object.keys(data);
//     for (let i = 0; i < keys.length; i++) {
//       cypher += keys[i] + ": '" + data[keys[i]] + "'";
//       if (!(i == keys.length - 1)) cypher += ",";
//     }
//     cypher += "})";
//     return this.session
//       .run(cypher)
//       .then(() => {
//         return true;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async getUserNotifications(userId: string): Promise<Notification[]> {
//     let notifications: any = [];
//     let cypher: string =
//       'Match(u:User)-[:HAS_NOTIFICATION]->(n:Notification) where u.userId = "' +
//       userId +
//       '" with n order by n.createdAt limit 10 return n';
//     return this.session
//       .run(cypher)
//       .then((result) => {
//         result.records.forEach((record) => {
//           notifications.push(record.toObject()["n"]["properties"]);
//         });
//         return notifications;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async changePassword(
//     token: string,
//     password: string
//   ): Promise<Boolean> {
//     const decodedToken: AuthData = getDecodedToken(forgotPasswordPrefix, token);
//     if (!decodedToken || decodedToken.userId == null)
//       throw new Error("Not authorized!");
//     const hashedPassword = await this.hashPassword(password);
//     if (hashedPassword !== null) {
//       let cypher: string =
//         'MATCH (n:User) WHERE n.userId = "' +
//         decodedToken.userId +
//         '" ' +
//         'SET n.password = "' +
//         hashedPassword +
//         '" ' +
//         "RETURN n";
//       return this.session
//         .run(cypher)
//         .then(() => {
//           return true;
//         })
//         .catch((error) => {
//           throw new Error(error);
//         });
//     }
//   }

//   public async forgotPassword(email: string): Promise<Boolean> {
//     return this.session
//       .run("MATCH (n { email: '" + email + "' }) RETURN n")
//       .then((result) => {
//         if (result.records.length !== 1) {
//           return true; //dont want to notify that the email doesnt exist for security reasons
//         }
//         const user = result.records[0].toObject()["n"]["properties"];
//         const token =
//           forgotPasswordPrefix +
//           jwt.sign({ userId: user.userId }, JWT_SECRET, { expiresIn: "1h" });
//         const url = `http://localhost:3000/user/change-password/${token}`;
//         sendEmail(email, url);
//         return true;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

  public async getAllUsers(): Promise<User[]> {
    let data;
    try{
        data = await this. g.V().hasLabel('user');
        console.log(data);
    }
    catch(error) {
        throw new Error(error);
    }
    return data;
  }

<<<<<<< Updated upstream
  public async getUserById(userId: string, email?: string): Promise<User[]> {
    let data;
    try{
        data = await this. g.V().has('user','username', userId)
        console.log(data);
=======
    // returns the all of the user's Groups 
    public async getUserGroupsById(userId: string): Promise<Group[]> {
        // const user = await this.getUserById(userId);
        // const groups: string[] = user[0].userGroups;
        // return this.groupContorller.batchGetWorkoutGroupByIds(groups);
        return null;
>>>>>>> Stashed changes
    }
    catch(error) {
        throw new Error(error);
    }
    return data;
  }

//   public async getUserFollowers(userId: string): Promise<User[]> {
//     let users: any = [];
//     return this.session
//       .run(
//         "MATCH (a:User),(b:User) WHERE " +
//           "b.userId = '" +
//           userId +
//           "' " +
//           "MATCH (a)-[r:FOLLOWS]->(b) RETURN a"
//       )
//       .then((result) => {
//         result.records.forEach((record) => {
//           users.push(record.toObject()["a"]["properties"]);
//         });
//         return users;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async getUserFollowing(userId: string): Promise<User[]> {
//     let users: any = [];
//     return this.session
//       .run(
//         "MATCH (a:User),(b:User) WHERE " +
//           "a.userId = '" +
//           userId +
//           "' " +
//           "MATCH (a)-[r:FOLLOWS]->(b) RETURN b"
//       )
//       .then((result) => {
//         result.records.forEach((record) => {
//           users.push(record.toObject()["b"]["properties"]);
//         });
//         return users;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async getNumFollowers(userId: string): Promise<number> {
//     return this.session
//       .run(
//         "MATCH ()-[r:FOLLOWS]->(n) WHERE n.userId = '" +
//           userId +
//           "' RETURN COUNT(r)"
//       )
//       .then((result) => {
//         return result.records[0].toObject()["COUNT(r)"]["low"];
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

//   public async toggleFollow(
//     userId: string,
//     followedUser: string,
//     isUnfollow: boolean
//   ): Promise<Boolean> {
//     if (userId !== followedUser) {
//       const cypher: string =
//         "MATCH (u:User), (p:User) WHERE u.userId = " +
//         '"' +
//         userId +
//         '" AND p.userId = "' +
//         followedUser +
//         '"' +
//         " CREATE (u)-[:FOLLOWS]->(p) WITH u, p MATCH (u)-[r:FOLLOWS]->(p), (u)-[:FOLLOWS]->(p) DELETE r";
//       return this.session
//         .run(cypher)
//         .then(() => {
//           if (!isUnfollow) {
//             try {
//               this.createUserNotification({
//                 userId: followedUser,
//                 triggeringUserId: userId,
//                 notificationType: NotificationType.New_Follower,
//               });
//             } catch (err) {
//               throw new Error(err);
//             }
//           }
//           return true;
//         })
//         .catch((error) => {
//           throw new Error(error);
//         });
//     }
//   }

//   public async updateUser(userId: string, data: any): Promise<Boolean> {
//     let cypher = "MERGE (n:User { userId: '" + userId + "' }) SET";
//     const keys = Object.keys(data);
//     for (let i = 0; i < keys.length; i++) {
//       cypher += " n." + keys[i] + " = '" + data[keys[i]] + "'";
//       if (!(i == keys.length - 1)) cypher += ",";
//     }
//     cypher += " RETURN n";
//     return this.session
//       .run(cypher)
//       .then(() => {
//         return true;
//       })
//       .catch((error) => {
//         throw new Error(error);
//       });
//   }

  public async deleteUserById(userId: string): Promise<Boolean> {
    try{
        await this.g.V().has('user','username', userId).drop();
        return true;
    }
    catch(error) {
        throw new Error(error);
    }
  }
}

export default UserController;
