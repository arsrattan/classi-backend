import bcrypt, {compare, hash} from "bcrypt-nodejs";
import {User} from "../entities/User";
import * as neo4j from 'neo4j-driver'
import {LoginResponse} from "../entities/LoginResponse";
import {Driver} from "neo4j-driver/types/v1/driver";

class UserController{

    public driver: Driver = neo4j.v1.driver(
        "bolt://localhost",
        neo4j.v1.auth.basic("neo4j", "letmein"),
        {encrypted: 'ENCRYPTION_OFF'})

    public async login(data: any): Promise<LoginResponse> {
        //not ready
        // const docClient = createDocumentClient("User");
        // const params = {
        //     TableName: "usersTable",
        //     KeyConditionExpression: 'userId = :i',
        //     ExpressionAttributeValues: {
        //         ':i': data.userId
        //     }
        // };
        // const promise = docClient.query(params).promise();
        // return promise.then(res => {
        //     if(res.Items.length !== 1){
        //         throw new Error("Could not find user");
        //     }
        //     bcrypt.compare(res.Items[0].password, data.password, function(err, res){
        //         if (err){
        //             throw new Error("Bad password");
        //         }
        //         else {
        //             // const refreshToken = sign(data, "wfjongnewgoeng", {expiresIn: "7d"});
        //             // const accessToken = sign(data, "wfjongnewgoeng", {expiresIn: "45min"});
        //         }
        //     });
        //     return { accessToken: "kwhfbefn" }
        // })
        return null;
    }

    public async registerUser(data: any): Promise<Boolean> {
        let cypher = "CREATE (n:User { "
        let keys = Object.keys(data)
        //there is probably a better way to construct the query
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
                console.log(error);
                this.driver.close()
                return false;
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
                console.log(error);
                this.driver.close()
                return error;
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
                console.log(error);
                this.driver.close()
                return error;
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
                console.log(error);
                this.driver.close()
                return error;
            });
    }

    public async getNumFollowers(userId: string): Promise<number> {
        const session = this.driver.session()
        return session.run('MATCH ()-[r:FOLLOWS]->(n) WHERE n.userId = \'' + userId + '\' RETURN COUNT(r)')
            .then(result => {
                session.close();
                this.driver.close();
                console.log(result.records[0].toObject())
                return result.records[0].toObject()["COUNT(r)"]['low'];
            })
            .catch(error => {
                session.close();
                console.log(error);
                this.driver.close()
                return -1;
            });
    }

    public async toggleFollow(followingUser: string, followedUser: string, isUnfollow: boolean): Promise<Boolean> {
        let cypher: string =
            'MATCH (a:User),(b:User) WHERE ' +
            'a.userId = \'' + followingUser +
            '\' AND b.userId = \'' + followedUser + '\' ';
        isUnfollow ?
            cypher += 'MATCH (a)-[r:FOLLOWS]->(b) DELETE r' : cypher += 'CREATE (a)-[r:FOLLOWS]->(b) RETURN type(r)'
        const session = this.driver.session()
        return session.run(cypher)
            .then(() => {
                session.close();
                this.driver.close();
                return true;
            })
            .catch(error => {
                session.close();
                console.log(error);
                this.driver.close()
                return false;
            });
    }

    public async updateUser(data: any, userId: string): Promise<Boolean> {

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
                console.log(error);
                this.driver.close()
                return false;
            });
    }
}

export default UserController;
