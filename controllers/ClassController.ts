import { Request, Response } from "express";
import createDocumentClient from "../src/lib/AWS";
import uniqid from 'uniqid';
import {Class} from "../entities/Classes";

class ClassController{

    public getAllClasses(): Promise<Class[]> {
        const docClient = createDocumentClient("Class");
        const params = { TableName: "classesTable" }; //I created this table locally
        const data = docClient.scan(params).promise();
        return data.then(res => <Class[]> res.Items)
    };

    public async getClassById(classId: string): Promise<Class[]> {
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            KeyConditionExpression: 'classId = :i',
            ExpressionAttributeValues: {
                ':i': classId
            }
        };
        const data = docClient.query(params).promise();
        return data.then(res => <Class[]> res.Items)
    };

    public async createClass(data: any): Promise<Boolean> {
        const docClient = createDocumentClient("Class");
        const classId = uniqid();
        const params = {
            TableName: "classesTable",
            Item: {
                classId: classId,
                className: data.className,
                classType: data.classType
            }
        };
        const d = docClient.put(params).promise();
        return d.then(() => true).catch(() => false)
    }

    public async updateClass(req: Request, res: Response): Promise<void> {
        // const classObj = new Class();
        // if (classObj === null) {
        //     res.sendStatus(404);
        // } else {
        //     const updatedClass = { classId: req.params.classId, ...req.body };
        //     res.json({ status: res.status, data: updatedClass });
        // }
    }

    public async deleteClassById(classId: string): Promise<Boolean> {
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId}
        };
        const data = docClient.delete(params).promise();
        return data.then(() => true).catch(() => false)
    }
}

export default ClassController;

