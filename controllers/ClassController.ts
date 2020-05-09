import { Request, Response } from "express";
import Class from "../src/models/Class";

class ClassController{

    public async listAllClasses(req: Request, res: Response): Promise<void> {
        //todo et classes from database
        res.send(['Class1', 'Class2']);
    };

    public async getClassById(req: Request, res: Response): Promise<void> {
        //Get the ID from the url
        const { params } = req;
        const classId: string = params.classId;
        //todo et the class from database
        try {
            if (+params.classId === 1) {
                res.send('Class 1 details');
            } else {
                res.send('Not Class 1 details');
            }
        } catch (error) {
            res.status(404).send("Class not found");
        }
    };

    public async createClass(req: Request, res: Response): Promise<void> {
        const newClass: Class = new Class(req.body);
        const classObj = new Class(); //todo get this somehow from DB
        if (classObj === null) {
            const result: any = null// todo save it in the DB here
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }
        } else {
            res.sendStatus(422);
        }
    }

    public async updateClass(req: Request, res: Response): Promise<void> {
        const classObj = new Class(); //todo get this somehow from DB
        if (classObj === null) {
            res.sendStatus(404);
        } else {
            const updatedClass = { classId: req.params.classId, ...req.body };
            res.json({ status: res.status, data: updatedClass });
        }
    }

    public async deleteClass(req: Request, res: Response): Promise<void> {
        const classObj = new Class(); //todo get this somehow from DB
        if (classObj === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "Class deleted Successfully" });
        }
    }
}

export default ClassController;
