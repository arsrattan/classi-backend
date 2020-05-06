import express, { Request, Response, NextFunction } from 'express';

const classRouter = express.Router()

classRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send(['Class1', 'Class2']);
}); // Returns all the classes

classRouter.get('/:classId', (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    if (+params.classId === 1) {
        res.send('Class 1 details');
    } else {
        res.send('Not Class 1 details');
    }
}); // Returns a specific class

export default classRouter;