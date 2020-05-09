import {NextFunction, Request, Response} from "express";
import passport from "passport";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import {JWT_SECRET} from "../util/secrets";

class UserController{

    public async registerUser(req: Request, res: Response): Promise<void> {
        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        //todo write user to DB here

        const token = jwt.sign({ username: req.body.userId, scope : req.body.scope }, JWT_SECRET);
        res.status(200).send({ token: token });
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

    public async listAllUsers (req: Request, res: Response) {
        //todo get users from database
        res.json([{
            'userId': 'Mike',
            'classes': ['class1', 'class2'],
            'videosCompleted': 5
        },
        {
            'userId': 'Joe',
            'classes': ['class1', 'class2'],
            'videosCompleted': 5
        }
        ]).send()
    }

    public async getUserById(req: Request, res: Response) {
        //Get the ID from the url
        const userId: string = req.params.userId;
        //todo get the user from database
        try {
            res.json({
                'userId': userId,
                'classes': ['class1', 'class2'],
                'videosCompleted': 5
            }).send()
        } catch (error) {
            res.status(404).send("User not found");
        }
    }
}

export default UserController;
