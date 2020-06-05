import uniqid from 'uniqid';
import {Class} from "../entities/Class";
import {createDocumentClient, Upload, uploadFileToS3} from "../lib/AWS";
import NotificationType from "../enums/NotificationType";
import UserController from "./UserController";

class ClassController{
    private docClient = createDocumentClient("Class");
    private userController: UserController = new UserController();

    public async getAllClasses(): Promise<Class[]> {
        const params = { TableName: "classesTable" }; //I created this table locally
        const promise = this.docClient.scan(params).promise();
        return promise.then(res => <Class[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async getClassById(classId: string): Promise<Class[]> {
        const params = {
            TableName: "classesTable",
            KeyConditionExpression: 'classId = :i',
            ExpressionAttributeValues: {':i': classId}
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => <Class[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async createClass(data: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-class-pictures");
        }
        data['createdAt'] = Date.now();
        data['comments'] = [];
        data['classId'] = "class" + uniqid();
        const params = {
            TableName: "classesTable",
            Item: data
        };
        const promise = this.docClient.put(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async updateClassById(classId: string, data?: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        let updateExpression = "SET";
        let expressionAttValues: any = {};
        //construct an update expression for only the values present in the req
        //also only want to add present fields to the expression attribute values
        const keys = Object.keys(data)
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
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async deleteClassById(classId: string, userId: string): Promise<Boolean> {
        const params = {
            TableName: "classesTable",
            Key: {"classId": classId},
            ConditionExpression: "instructorUserId = :instructorUserId",
            ExpressionAttributeValues: {
                ':instructorUserId': userId
            }
        };
        const promise = this.docClient.delete(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async addCommentToClass(userId: string, classCreator: string, classId: string, data: any): Promise<Boolean> {
        data['createdAt'] = Date.now();
        data['commentId'] = "comment" + uniqid();
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
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: classCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType.New_Class_Comment
                });
            }
            catch(err){
                throw new Error(err);
            }
            return true
        }).catch(err => {
            throw new Error(err);
        });
    }

    public async likeClass(userId: string, classCreator: string, classId: string, isUnlike: boolean): Promise<Boolean> {
        //todo validate real class
        let params;
        if(!isUnlike){
            params = {
                TableName: "classesTable",
                Key: {"classId": classId},
                UpdateExpression : 'ADD #likes :likes',
                ExpressionAttributeNames : {'#likes' : 'likes'},
                ExpressionAttributeValues : {':likes' : this.docClient.createSet([userId])},
                ReturnValues: 'UPDATED_NEW'
            };
        }
        else {
            params = {
                TableName: "classesTable",
                Key: {"classId": classId},
                UpdateExpression : 'DELETE likes :likes',
                ExpressionAttributeValues : {':likes' : this.docClient.createSet([userId])},
                ReturnValues: 'ALL_NEW'
            };
        }
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: classCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType.New_Class_Like
                });
            }
            catch(err){
                throw new Error(err);
            }
            return true;
        }).catch(err => {
            throw new Error(err);
        });
    }

    public async joinClass(userId: string, classCreator: string, classId: string, isUnlike: boolean): Promise<Boolean> {
        //todo validate real class
        let params;
        if(!isUnlike){
            params = {
                TableName: "classesTable",
                Key: {"classId": classId},
                UpdateExpression : 'ADD #registeredUsers :registeredUsers',
                ExpressionAttributeNames : {'#registeredUsers' : 'registeredUsers'},
                ExpressionAttributeValues : {':registeredUsers' : this.docClient.createSet([userId])},
                ReturnValues: 'UPDATED_NEW'
            };
        }
        else {
            params = {
                TableName: "classesTable",
                Key: {"classId": classId},
                UpdateExpression : 'DELETE registeredUsers :registeredUsers',
                ExpressionAttributeValues : {':registeredUsers' : this.docClient.createSet([userId])},
                ReturnValues: 'ALL_NEW'
            };
        }
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: classCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType.New_Class_Registration
                });
            }
            catch(err){
                throw new Error(err);
            }
            return true;
        }).catch(err => {
            throw new Error(err);
        });
    }
}

export default ClassController;

