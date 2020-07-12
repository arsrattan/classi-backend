"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const AWS_1 = require("../lib/AWS");
const UserController_1 = __importDefault(require("./UserController"));
const groupTable = "classi-workout-groups";
class GroupController {
    constructor() {
        this.docClient = AWS_1.createDocumentClient("Group");
        this.userController = new UserController_1.default();
    }
    async getWorkoutGroupById(groupId) {
        const params = {
            TableName: groupTable,
            KeyConditionExpression: 'groupId = :i',
            ExpressionAttributeValues: { ':i': groupId }
        };
        const groupObj = this.docClient.query(params).promise();
        return groupObj.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async batchGetWorkoutGroupByIds(groupIds) {
        const keys = [];
        groupIds.forEach(x => keys.push({ groupId: x }));
        const params = {
            RequestItems: {
                groupTable: {
                    Keys: keys
                }
            }
        };
        const groupsRes = [];
        await this.docClient.batchGet(params, function (err, data) {
            if (err)
                console.log(err);
            else {
                data.Responses.groupTable.forEach(function (element) {
                    groupsRes.push(element);
                });
            }
        }).promise();
        return groupsRes;
    }
    ;
    async createGroup(data) {
        data["createdTime"] = Date.now();
        data["groupId"] = uniqid_1.default();
        data["savedClasses"] = [];
        data["scheduledClasses"] = [];
        data["pastClasses"] = [];
        const params = {
            TableName: groupTable,
            Item: data
        };
        try {
            await this.docClient.put(params).promise();
            return true;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async updateGroupById(groupId, data) {
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
            TableName: groupTable,
            Key: { "groupId": groupId },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttValues
        };
        try {
            await this.docClient.update(params).promise();
            return true;
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async deleteGroupById(groupId, userId) {
        const params = {
            TableName: groupTable,
            Key: { "groupId": groupId },
            ConditionExpression: "members CONTAINS (:userId)",
            ExpressionAttributeValues: {
                ':userId': userId
            }
        };
        try {
            await this.docClient.delete(params).promise();
            return true;
        }
        catch (err) {
            throw new Error(err);
        }
    }
}
exports.default = GroupController;
//# sourceMappingURL=GroupController.js.map