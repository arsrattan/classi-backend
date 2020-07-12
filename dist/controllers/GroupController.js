"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
const AWS_1 = require("../lib/AWS");
class GroupController {
    constructor() {
        this.docClinet = AWS_1.createDocumentClient("Group");
    }
    async getWorkoutGroup(groupId) {
        const params = {
            TableName: "GroupsTable",
            KeyConditionExpression: 'groupId = :i',
            ExpressionAttributeValues: { ':i': groupId }
        };
        const promise = this.docClinet.query(params).promise();
        return promise.then(res => res.Items).catch(err => {
            throw new Error(err);
        });
    }
    ;
    async createGroup(data) {
        if (data[""])
            data["createdTime"] = Date.now();
        data["groupId"] = uniqid_1.default();
        data["savedClasses"] = [];
        data["scheduledClasses"] = [];
        data["pastClasses"] = [];
    }
}
exports.default = GroupController;
//# sourceMappingURL=GroupController.js.map