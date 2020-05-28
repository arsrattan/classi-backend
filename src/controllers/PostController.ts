import uniqid from 'uniqid';
import {Post} from "../entities/Post";
import {createDocumentClient, Upload, uploadFileToS3} from "../lib/AWS";

class PostController{

    public getAllPostsForUser(userId: string): Promise<Post[]> {
        const docClient = createDocumentClient("Post");
        const params = { TableName: "postsTable" }; //I created this table locally
        const promise = docClient.scan(params).promise();
        return promise.then(res => <Post[]> res.Items)
    };

    public async getPostById(postId: string): Promise<Post[]> {
        const docClient = createDocumentClient("Post");
        const params = {
            TableName: "postsTable",
            KeyConditionExpression: 'postId = :i',
            ExpressionAttributeValues: {':i': postId}
        };
        const promise = docClient.query(params).promise();
        return promise.then(res => <Post[]> res.Items)
    };

    public async createPost(data: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        data['postId'] = uniqid();
        data['comments'] = [];
        data['createdAt'] = Date.now();
        const docClient = createDocumentClient("Post");
        const params = {
            TableName: "postsTable",
            Item: data
        };
        const promise = docClient.put(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async updatePostById(postId: string, data?: any, picture?: Upload): Promise<Boolean> {
        if(picture){
            data = await uploadFileToS3(data, picture, "classi-profile-pictures");
        }
        const docClient = createDocumentClient("Post");
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
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async deletePost(postId: string): Promise<Boolean> {
        //todo return something better than a success boolean
        const docClient = createDocumentClient("Post");
        const params = {
            TableName: "postsTable",
            Key: { "postId": postId }
        };
        const promise = docClient.delete(params).promise();
        return promise.then(() => true).catch(() => false)
    }

    public async addCommentToPost(userId: string, postId: string, data: any): Promise<Boolean> {
        data['createdAt'] = Date.now();
        data['likes'] = [];
        data['commentId'] = uniqid();
        const docClient = createDocumentClient("Post");
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
        const promise = docClient.update(params).promise();
        return promise.then(() => true).catch(() => false)
    }
}

export default PostController;

