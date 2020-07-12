"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const AWS_1 = require("../lib/AWS");
const UserController_1 = __importDefault(require("./UserController"));
const NotificationType_1 = __importDefault(require("../enums/NotificationType"));
class PostController {
    constructor() {
        this.docClient = AWS_1.createDocumentClient("Post");
        this.userController = new UserController_1.default();
    }
    getAllPostsForUser(userId) {
        const params = { TableName: "postsTable" };
        const promise = this.docClient.scan(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async getPostById(postId) {
        const params = {
            TableName: "postsTable",
            KeyConditionExpression: 'postId = :i',
            ExpressionAttributeValues: { ':i': postId }
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async createPost(data) {
        data['postId'] = "post" + uniqid_1.default();
        data['comments'] = [];
        data['createdAt'] = Date.now();
        const params = {
            TableName: "postsTable",
            Item: data
        };
        const promise = this.docClient.put(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async updatePostById(postId, data) {
        let updateExpression = "SET";
        let expressionAttValues = {};
        let keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) {
            expressionAttValues[":" + keys[i]] = data[keys[i]];
            updateExpression += " " + keys[i] + " = :" + keys[i];
            if (!(i == keys.length - 1))
                updateExpression += ",";
        }
        const params = {
            TableName: "postsTable",
            Key: { "postId": postId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async deletePost(postId) {
        const params = {
            TableName: "postsTable",
            Key: { "postId": postId }
        };
        const promise = this.docClient.delete(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async addCommentToPost(userId, postCreator, postId, data) {
        data['createdAt'] = Date.now();
        data['commentId'] = "comment" + uniqid_1.default();
        const params = {
            TableName: "postsTable",
            Key: { "postId": postId },
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
                    userId: postCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType_1.default.New_Post_Comment
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
    async likePost(userId, postCreator, postId, isUnlike) {
        let params;
        if (!isUnlike) {
            params = {
                TableName: "postsTable",
                Key: { "postId": postId },
                UpdateExpression: 'ADD #likes :likes',
                ExpressionAttributeNames: { '#likes': 'likes' },
                ExpressionAttributeValues: { ':likes': this.docClient.createSet([userId]) },
                ReturnValues: 'UPDATED_NEW'
            };
        }
        else {
            params = {
                TableName: "postsTable",
                Key: { "postId": postId },
                UpdateExpression: 'DELETE likes :likes',
                ExpressionAttributeValues: { ':likes': this.docClient.createSet([userId]) },
                ReturnValues: 'ALL_NEW'
            };
        }
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: postCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType_1.default.New_Post_Like
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
}
exports.default = PostController;
//# sourceMappingURL=PostController.js.map