import {NextFunction, Request, Response} from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import {JWT_SECRET} from "../util/secrets";
import createDocumentClient from "../src/lib/AWS";
import {User} from "../entities/Users";

class UserController{

    public async registerUser(data: any): Promise<Boolean> {
        const docClient = createDocumentClient("User");
        const params = {
            TableName: "usersTable",
            Item: {
                userId: data.userId,
                email: data.email,
            }
        };
        const d = docClient.put(params).promise();
        return d.then(() => true).catch(() => false)
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
        const data = docClient.scan(params).promise();
        return data.then(res => <User[]> res.Items)
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
        const data = docClient.query(params).promise();
        return data.then(res => <User[]> res.Items)
    }

    public async deleteUserById(userId: string) {
        const docClient = createDocumentClient("User");
        const params = {
            TableName: "usersTable",
            Key: {"userId": userId}
        };
        const data = docClient.delete(params).promise();
        return data.then(() => true).catch(() => false)
    }
}

export default UserController;
