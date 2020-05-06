import { Application } from 'express';
import classRouter from './class/class';
import userRouter from './user/user';

export default function setRoutes(app: Application): void {
    app.use('/classes', classRouter);
    app.use('/users', userRouter);
}