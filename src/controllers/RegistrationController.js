"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const AWS_1 = require("../lib/AWS");
class RegistrationController {
    constructor() {
        this.docClient = AWS_1.createDocumentClient("Registration");
    }
    async getRegistrationById(registrationId) {
        const params = {
            TableName: "classRegistrationsTable",
            KeyConditionExpression: 'registrationId = :i',
            ExpressionAttributeValues: { ':i': registrationId }
        };
        const promise = this.docClient.query(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async createRegistration(data) {
        data['registrationId'] = "registration" + uniqid_1.default();
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
    async updateRegistrationById(registrationId, data) {
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
            TableName: "classRegistrationsTable",
            Key: { "registrationId": registrationId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        const promise = this.docClient.update(params).promise();
        return promise.then(() => true).catch(err => {
            throw new Error(err);
        });
    }
    async deleteRegistration(registrationId) {
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
exports.default = RegistrationController;
//# sourceMappingURL=RegistrationController.js.map