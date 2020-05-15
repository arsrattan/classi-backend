import * as jwt from "jsonwebtoken";
import {MiddlewareFn} from "type-graphql";

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

export const isCorrectUser: MiddlewareFn<{req: any}> = ({ args, context: {req}, info, root }, next) => {
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
    if(!decodedToken || args['userId'] !== decodedToken.userId) throw new Error('Not authorized!');

    return next();
};