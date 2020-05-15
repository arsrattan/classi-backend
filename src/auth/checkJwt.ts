import * as jwt from "jsonwebtoken";
import {AuthChecker} from "type-graphql";

export const checkJwt: AuthChecker<{req: any}> = ({ context: {req} }) => {
    //We send in a header formatted as 'Bearer eofnow23rgn4pitgnwef2onfblahblah' from the frontend
    const authHeader = req.get('Authorization');
    if (!authHeader) return false
    const token = authHeader.split(' ')[1];
    if(!token || token == '') return false;
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "wefgeijgne"); // need to move the key
        console.log(decodedToken);
    }
    catch (err) {
        console.log(err);
        return false;
    }
    if(!decodedToken) return false;

    return true;
};