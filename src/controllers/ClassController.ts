import uniqid from 'uniqid';
import {Class} from "../entities/Class";
import {createDocumentClient, Upload, uploadFileToS3} from "../lib/AWS";

class ClassController{

    public async getAllClasses(): Promise<Class[]> {
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
            ExpressionAttributeValues: {':i': classId}
        };
        const promise = docClient.query(params).promise();
        return promise.then(res => <Class[]> res.Items)
    };

    public async createClass(data: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        data['createdAt'] = Date.now();
        data['comments'] = [];
        data['classId'] = uniqid();
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            Item: data
        };
        const promise = docClient.put(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async updateClassById(classId: string, data?: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
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
            ConditionExpression: "instructorUserId = :instructorUserId",
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async deleteClassById(classId: string, userId: string): Promise<Boolean> {
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId},
            ConditionExpression: "instructorUserId = :instructorUserId",
            ExpressionAttributeValues: {
                ':instructorUserId': userId
            }
        };
        const promise = docClient.delete(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async addCommentToClass(userId: string, classId: string, data: any): Promise<Boolean> {
        data['createdAt'] = Date.now();
        data['likes'] = [];
        data['commentId'] = uniqid();
        const docClient = createDocumentClient("Class");
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId},
            UpdateExpression: 'SET #comments = list_append(if_not_exists(#comments, :empty_list), :comment)',
            ExpressionAttributeNames: {
                '#comments': 'comments'
            },
            ExpressionAttributeValues: {
                ':comment': [data],
                ':empty_list': []
            }
        };
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }
}

export default ClassController;

