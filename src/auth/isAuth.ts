import * as jwt from "jsonwebtoken";
import {MiddlewareFn} from "type-graphql";
import AWS from "aws-sdk";
import {performUpload, Upload} from "../lib/AWS";
import {confirmUserPrefix} from "../util/tokenConstants";
import {AuthData} from "../entities/AuthData";

export const isAuth: MiddlewareFn<{req: any}> = ({ context: {req} }, next) => {
    //We send in a header formatted as 'Bearer eofnow23rgn4pitgnwef2onfblahblah' from the frontend
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if(!token || token == '') throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "wefgeijgne"); // need to move the key
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if(!decodedToken) throw new Error('Not authorized!');

    return next();
};

export const isCorrectUser: MiddlewareFn<{req: any}> = ({ args, context: {req} }, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if(!token || token == '') throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "wefgeijgne"); // need to move the key
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if(!decodedToken || args['userId'] !== decodedToken.userId) throw new Error('Not authorized!');

    return next();
};

export const isCorrectUserFromJson: MiddlewareFn<{req: any}> = ({ args, context: {req} }, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) throw new Error('Not authorized!');
    const token = authHeader.split(' ')[1];
    if(!token || token == '') throw new Error('Not authorized!');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "wefgeijgne"); // need to move the key
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    let decodedUser = (args['data'].instructorUserId == null)
        ? args['data'].creator
        : args['data'].instructorUserId;
    if(!decodedToken || decodedUser !== decodedToken.userId) throw new Error('Not authorized!');

    return next();
};

export const isCorrectUserFromConfirmation: MiddlewareFn<{req: any}> = ({ args}, next) => {
    const token = args['token'];
    if(!token || token == '') throw new Error('Not authorized!');
    const tokenConent = token.split(":")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenConent, "wefgeijgne"); // need to move the key
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    if(!decodedToken || decodedToken.userId == null) throw new Error('Not authorized!');
    return next();
};

export function getDecodedToken(prefix: string, token: string): AuthData {
    if(!token.startsWith(prefix)){
        throw new Error('Incorrect token type!')
    }
    const tokenContent = token.split(":")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(tokenContent, "wefgeijgne"); // need to move the key
    }
    catch (err) {
        throw new Error('Not authorized!');
    }
    return decodedToken;
}