import express, { Request, Response, NextFunction } from 'express';

const userRouter = express.Router();

userRouter.get('/:accountId', (req: Request, res: Response, next: NextFunction) => {
    res.json({
        'userId': 'test',
        'classes': ['class1', 'class2'],
        'videosCompleted': 5
    }).send()
}) // Returns all the user details for this accountId

export default userRouter;