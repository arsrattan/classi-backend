import uniqid from 'uniqid';
import {Post} from "../entities/Post";
import {createDocumentClient, Upload, uploadFileToS3} from "../lib/AWS";
import UserController from "./UserController";
import NotificationType from "../enums/NotificationType";

class PostController{
    private docClient = createDocumentClient("Post");
    private userController: UserController = new UserController();

    public getAllPostsForUser(userId: string): Promise<Post[]> {
        const params = { TableName: "postsTable" };
        const promise = this.docClient.scan(params).promise();
        return promise.then(res => <Post[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async getPostById(postId: string): Promise<Post[]> {
        const params = {
            TableName: "postsTable",
            KeyConditionExpression: 'postId = :i',
            ExpressionAttributeValues: {':i': postId}
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => <Post[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async createPost(data: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        data['postId'] = "post" + uniqid();
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

    public async updatePostById(postId: string, data?: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
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
            TableName: "postsTable",
            Key: {"postId": postId},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async deletePost(postId: string): Promise<Boolean> {
        const params = {
            TableName: "postsTable",
            Key: { "postId": postId }
        };
        const promise = this.docClient.delete(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async addCommentToPost(userId: string, postCreator: string, postId: string, data: any): Promise<Boolean> {
        data['createdAt'] = Date.now();
        data['likes'] = [];
        data['commentId'] = "comment" + uniqid();
        const params = {
            TableName: "postsTable",
            Key: {"postId": postId},
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
                    notificationType: NotificationType.New_Post_Comment
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

    public async likePost(userId: string, postCreator: string, postId: string, isUnlike: boolean): Promise<Boolean> {
        let params;
        if(!isUnlike){
            params = {
                TableName: "postsTable",
                Key: {"postId": postId},
                UpdateExpression : 'ADD #likes :likes',
                ExpressionAttributeNames : {'#likes' : 'likes'},
                ExpressionAttributeValues : {':likes' : this.docClient.createSet([userId])},
                ReturnValues: 'UPDATED_NEW'
            };
        }
        else {
            params = {
                TableName: "postsTable",
                Key: {"postId": postId},
                UpdateExpression : 'DELETE likes :likes',
                ExpressionAttributeValues : {':likes' : this.docClient.createSet([userId])},
                ReturnValues: 'ALL_NEW'
            };
        }
        const promise = this.docClient.update(params).promise();
        return promise.then(() => {
            try {
                this.userController.createUserNotification({
                    userId: postCreator,
                    triggeringUserId: userId,
                    notificationType: NotificationType.New_Post_Like
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
}

export default PostController;

