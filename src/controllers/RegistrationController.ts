import uniqid from 'uniqid';
import {createDocumentClient} from "../lib/AWS";
import {Registration} from "../entities/Registration";
import UserController from "./UserController";


class RegistrationController{
    private docClient = createDocumentClient("Registration");
    private userController: UserController = new UserController();

    public async getRegistrationById(registrationId: string): Promise<Registration[]> {
        const params = {
            TableName: "classRegistrationsTable",
            KeyConditionExpression: 'registrationId = :i',
            ExpressionAttributeValues: {':i': registrationId}
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => <Registration[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async getRegistrationsForUser(username: string): Promise<Registration[]> {
        const params = {
            TableName: "classRegistrationsTable",
            FilterExpression: '#username = :username',
            ExpressionAttributeNames: {'#username': 'username'},
            ExpressionAttributeValues: {':username': username},
        };
        const promise = this.docClient.scan(params).promise();
        return promise.then(res => <Registration[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async createRegistration(data: any): Promise<Boolean> {
        data['registrationId'] = "registration" + uniqid();
        data['createdAt'] = Date.now();
        const params = {
            TableName: "classRegistrationsTable",
            Item: data
        };
        const promise = this.docClient.put(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async updateRegistrationById(registrationId: string, data: any): Promise<Boolean> {
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
            TableName: "classRegistrationsTable",
            Key: {"registrationId": registrationId},
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

    public async deleteRegistration(registrationId: string): Promise<Boolean> {
        const params = {
            TableName: "classRegistrationsTable",
            Key: { "registrationId": registrationId }
        };
        const promise = this.docClient.delete(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }

}

export default RegistrationController;

