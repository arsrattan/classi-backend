import bcrypt, {compare, hash} from "bcrypt-nodejs";
import createDocumentClient from "../lib/AWS";
import {User} from "../entities/User";
import {LoginResponse} from "../entities/LoginResponse";

class UserController{

    public async login(data: any): Promise<LoginResponse> {
        const docClient = createDocumentClient("User");
        const params = {
            TableName: "usersTable",
            KeyConditionExpression: 'userId = :i',
            ExpressionAttributeValues: {
                ':i': data.userId
            }
        };
        const promise = docClient.query(params).promise();
        return promise.then(res => {
            if(res.Items.length !== 1){
                throw new Error("Could not find user");
            }
            bcrypt.compare(res.Items[0].password, data.password, function(err, res){
                if (err){
                    throw new Error("Bad password");
                }
                else {
                    // const refreshToken = sign(data, "wfjongnewgoeng", {expiresIn: "7d"});
                    // const accessToken = sign(data, "wfjongnewgoeng", {expiresIn: "45min"});
                }
            });
            return { accessToken: "kwhfbefn" }
        })
    }

    public async registerUser(data: any): Promise<Boolean> {
        const docClient = createDocumentClient("User");
        let user: any = {};
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            if(keys[i] == 'password'){
                const hashedPassword = hash(data[keys[i]], bcrypt.genSaltSync(13), (err, res) => {
                    console.log('hash', res)
                });
                user[keys[i]] = hashedPassword;
            }
            else{
                user[keys[i]] = data[keys[i]];
            }
        }
        const params = {
            TableName: "usersTable",
            Item: user
        };
        const promise = docClient.put(params).promise();
        return promise.then(() => true).catch(() => false)
        // const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        //
        // //todo write user to DB here
        //
        // const token = jwt.sign({ username: req.body.userId, scope : req.body.scope }, JWT_SECRET);
        // res.status(200).send({ token: token });
    }

    public async getAllUsers() {
        const docClient = createDocumentClient("User");
        const params = { TableName: "usersTable" }; //I created this table locally
        const promise = docClient.scan(params).promise();
        return promise.then(res => <User[]> res.Items)
    }

    public async getUserById(userId: string) {
        const docClient = createDocumentClient("User");
        const params = {
            TableName: "usersTable",
            KeyConditionExpression: 'userId = :i',
            ExpressionAttributeValues: {
                ':i': userId
            }
        };
        const promise = docClient.query(params).promise();
        return promise.then(res => <User[]> res.Items)
    }

    public async updateUser(data: any, userId: string): Promise<Boolean> {
        const docClient = createDocumentClient("User");
        let updateExpression = "SET";
        let expressionAttValues: any = {};
        //construct an update expression for only the values present in the req
        //also only want to add present fields to the expression attribute values
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            expressionAttValues[":" + keys[i]] = data[keys[i]];
            updateExpression += " " + keys[i] + " = :" + keys[i];
            if(!(i == keys.length - 1)) updateExpression += ",";
        }
        const params = {
            TableName: "usersTable",
            Key: {"userId": userId},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async deleteUserById(userId: string) {
        const docClient = createDocumentClient("User");
        const params = {
            TableName: "usersTable",
            Key: {"userId": userId}
        };
        const promise = docClient.delete(params).promise();
        return promise.then(() => true).catch(() => false)
    }
}

export default UserController;
