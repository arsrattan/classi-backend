import bcrypt from "bcryptjs";
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
import { Notification } from "../entities/Notification";
import AccountType from "../enums/AccountType";
import {driver, process, structure} from "gremlin";
import { uuid } from "uuidv4";

const {
    DriverRemoteConnection,
} = driver;

const {
  Graph,
} = structure;

const serializer = require('gremlin/lib/structure/io/graph-serializer');
const writer = new serializer.GraphSON3Writer();
const graph = new Graph();

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

  public async login(username: string, password: string): Promise<AuthData> {
    const data = await this.g.V().limit(1).count().next();
    console.log(`Data: ${data}`);
    return {
      accessToken: "",
      userId: "",
      expirationInHours: 1,
    };
  }

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

  public async registerUser(
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
    }
    if ((await this.usernameBelongsToExistingUser(username)) === true) {
      throw new Error(
        "The provided username has already been used to register for another account"
      );
    }

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

  public async createUserNotification(data: any): Promise<Boolean> {
    try {
        const userData = await this.getUserById(data["triggeringUserId"]);
        const notificationId = uuid();
        await this.g
          .addV("notification")
          .property("notificationId", notificationId)
          .property("triggeringUserId", data["triggeringUserId"])
          .property("triggeringUserS3Url", userData[0]["s3url"])
          .property("createdAt", Date.now().toString())
          .property("accountType", AccountType.Free)
          .next();
  
          return true;

      } catch (err) {
        throw new Error(err);
      }
  }

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
    let users = [];
    try{
        data = await this.g.V().hasLabel('user').valueMap().toList();
        const res = JSON.parse(writer.write(data));
        for(let u of res['@value']){
            let user = {};
            for(let i=0; i < u['@value'].length; i++){
                if(typeof u['@value'][i] === 'string'){
                    user[u['@value'][i]] = u['@value'][i + 1]['@value'][0]
                }
            }
            users.push(user);
        }
        
    }
    catch(error) {
        throw new Error(error);
    }
    return users;
  }

  public async getUserById(username: string, email?: string): Promise<User> {
    let data;
    let user: any = {};
    try{
        data = await this. g.V().has('user','username', username).valueMap().toList();
        const res = JSON.parse(writer.write(data));
        console.log(res);
        for(let u of res['@value']){
            for(let i=0; i < u['@value'].length; i++){
                if(typeof u['@value'][i] === 'string'){
                    user[u['@value'][i]] = u['@value'][i + 1]['@value'][0]
                }
            }
        }
    }
    catch(error) {
        throw new Error(error);
    }
    return user;
  }

  public async getUserFollowers(userId: string): Promise<User[]> {
    let data;
    let users: any = [];
    try{
        data = await this.g.V().has('user','username', userId).in_('follows').valueMap().toList();
        const res = JSON.parse(writer.write(data));
        for(let u of res['@value']){
            let user = {};
            for(let i=0; i < u['@value'].length; i++){
                if(typeof u['@value'][i] === 'string'){
                    user[u['@value'][i]] = u['@value'][i + 1]['@value'][0]
                }
            }
            users.push(user);
        }
    }
    catch(error) {
        throw new Error(error);
    }
    return users;
  }

  public async getUserFollowing(userId: string): Promise<User[]> {
    let data;
    let users: any = [];
    try{
        data = await this.g.V().has('user','username', userId).out('follows').valueMap().toList();
        const res = JSON.parse(writer.write(data));
        for(let u of res['@value']){
            let user = {};
            for(let i=0; i < u['@value'].length; i++){
                if(typeof u['@value'][i] === 'string'){
                    user[u['@value'][i]] = u['@value'][i + 1]['@value'][0]
                }
            }
            users.push(user);
        }
    }
    catch(error) {
        throw new Error(error);
    }
    return users;
  }

  public async getNumFollowers(userId: string): Promise<number> {
    let num;
    try{
        num = Number((await this.g.V().has('user','username', userId).outE('follows').count().next()).value);
        return num;
    }
    catch(error) {
        throw new Error(error);
    }
  }

  public async toggleFollow(
    userId: string,
    followedUser: string,
    isUnfollow: boolean
  ): Promise<Boolean> {
    if (userId !== followedUser) {
        try{
            if(!isUnfollow){
                await this.g.V()
                .has('user','username', userId)
                .addE('follows')
                .to(this.g.V().has('user','username', followedUser)).next();
            }
            else {
                await this.g.V()
                .has('user','username', userId)
                .outE('follows')
                .where(this.g.V().has('user','username', followedUser)).drop().next();
            }
            return true;
        }
        catch(error) {
            throw new Error(error);
        }
        
    }
  }

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
