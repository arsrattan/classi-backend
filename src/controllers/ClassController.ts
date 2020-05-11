import createDocumentClient from "../lib/AWS";
import uniqid from 'uniqid';
import {Class} from "../entities/Classes";

class ClassController{

    public getAllClasses(): Promise<Class[]> {
        const docClient = createDocumentClient("Class");
        const params = { TableName: "classesTable" }; //I created this table locally
        const promise = docClient.scan(params).promise();
        return promise.then(res => <Class[]> res.Items)
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
        const promise = docClient.query(params).promise();
        return promise.then(res => <Class[]> res.Items)
    };

    public async createClass(data: any): Promise<Boolean> {
        const docClient = createDocumentClient("Class");
        const classId = uniqid();
        let createdClass: any = {classId: classId};
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            createdClass[keys[i]] = data[keys[i]];
        }
        const params = {
            TableName: "classesTable",
            Item: createdClass
        };
        const promise = docClient.put(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async updateClassById(data: any, classId: string): Promise<Boolean> {
        const docClient = createDocumentClient("Class");
        let updateExpression = "SET";
        let expressionAttValues: any = {};
        //construct an update expression for only the values present in the req
        //also only want to add present fields to the expression attribute values
        let keys = Object.keys(data)
        for(let i = 0; i < keys.length; i++){
            expressionAttValues[":" + keys[i]] = data[keys[i]];
            updateExpression += " " + keys[i] + " = :" + keys[i];
            if(!(i == keys.length - 1)) updateExpression += ",";
        }
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async deleteClassById(classId: string): Promise<Boolean> {
        //todo return something better than a success boolean
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId}
        };
        const promise = docClient.delete(params).promise();
        return promise.then(() => true).catch(() => false)
    }
}

export default ClassController;

