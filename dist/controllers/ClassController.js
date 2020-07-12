"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const AWS_1 = require("../lib/AWS");
const NotificationType_1 = __importDefault(require("../enums/NotificationType"));
const UserController_1 = __importDefault(require("./UserController"));
class ClassController {
    constructor() {
        this.docClient = AWS_1.createDocumentClient("Class");
        this.registrationsDocClient = AWS_1.createDocumentClient("Registration");
        this.userController = new UserController_1.default();
    }
    async getAllClasses() {
        const params = { TableName: "classesTable" };
        const promise = this.docClient.scan(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async getClassById(classId) {
        const params = {
            TableName: "classesTable",
            KeyConditionExpression: 'classId = :i',
            ExpressionAttributeValues: { ':i': classId }
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async createClass(data) {
        if (data['scheduledTime'] == null)
            data['scheduledTime'] = Date.now();
        data['createdAt'] = Date.now();
        data['comments'] = [];
        data['classId'] = "class" + uniqid_1.default();
        const params = {
            TableName: "classesTable",
            Item: data
        };
        const promise = this.docClient.put(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async updateClassById(classId, data) {
        let updateExpression = "SET";
        let expressionAttValues = {};
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            expressionAttValues[":" + keys[i]] = data[keys[i]];
            updateExpression += " " + keys[i] + " = :" + keys[i];
            if (!(i == keys.length - 1))
                updateExpression += ",";
        }
        const params = {
            TableName: "classesTable",
            Key: { "classId": classId },
            UpdateExpression: updateExpression,
            ConditionExpression: "instructorUserId = :instructorUserId",
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async deleteClassById(classId, userId) {
        const params = {
            TableName: "classesTable",
            Key: { "classId": classId },
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
    async addCommentToClass(userId, classCreator, classId, data) {
        data['createdAt'] = Date.now();
        data['commentId'] = "comment" + uniqid_1.default();
        const params = {
            TableName: "classesTable",
            Key: { "classId": classId },
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
                    notificationType: NotificationType_1.default.New_Class_Comment
                });
            }
            catch (err) {
                throw new Error(err);
            }
            return true;
        }).catch(err => {
            throw new Error(err);
        });
    }
    async likeClass(userId, classCreator, classId, isUnlike) {
        let params;
        if (!isUnlike) {
            params = {
                TableName: "classesTable",
                Key: { "classId": classId },
                UpdateExpression: 'ADD #likes :likes',
                ExpressionAttributeNames: { '#likes': 'likes' },
                ExpressionAttributeValues: { ':likes': this.docClient.createSet([userId]) },
                ReturnValues: 'UPDATED_NEW'
            };
        }
        else {
            params = {
                TableName: "classesTable",
                Key: { "classId": classId },
                UpdateExpression: 'DELETE likes :likes',
                ExpressionAttributeValues: { ':likes': this.docClient.createSet([userId]) },
                ReturnValues: 'ALL_NEW'
            };
        }
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: classCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType_1.default.New_Class_Like
                });
            }
            catch (err) {
                throw new Error(err);
            }
            return true;
        }).catch(err => {
            throw new Error(err);
        });
    }
    async registerForClass(userId, classId, scheduledTime) {
        let data = {};
        data['scheduledTime'] = scheduledTime;
        data['createdAt'] = Date.now();
        data['userId'] = userId;
        data['classId'] = classId;
        data['invitedRegistrations'] = [];
        data['registrationId'] = "registration" + uniqid_1.default();
        const params = {
            TableName: "registrationsTable",
            Item: data
        };
        const promise = this.docClient.put(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
}
exports.default = ClassController;
//# sourceMappingURL=ClassController.js.map