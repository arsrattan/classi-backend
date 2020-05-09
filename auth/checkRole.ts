import { Request, Response, NextFunction } from "express";
import User from "../src/models/User";
import AccountType from "../enums/AccountType";

export const checkRole = (roles: Array<AccountType>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const userId = res.locals.jwtPayload.userId;

        let user: User;
        try {
            //todo get user role from the database
            user = new User(userId);
        } catch (userId) {
            res.status(401).send();
        }

        //Check if array of authorized roles includes the user's role
        if (roles.indexOf(user.accountType) > -1) next();
        else res.status(401).send();
    };
};
