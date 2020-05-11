import {NextFunction, Request, Response} from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import {JWT_SECRET} from "../../util/secrets";
import createDocumentClient from "../lib/AWS";
import {User} from "../entities/Users";

class UserController{

    public async registerUser(data: any): Promise<Boolean> {
        const docClient = createDocumentClient("User");
        let user: any = {};
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            user[keys[i]] = data[keys[i]];
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

    public async authenticateUser(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("local", function (err, user, info) {
            if (err) return next(err);
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            } else {
                const token = jwt.sign({ userId: user.userId }, JWT_SECRET);
                res.status(200).send({ token: token });
            }
        });
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
