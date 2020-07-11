import { Request, Response } from "express";
import uniqid from 'uniqid';
import Group from "../entities/Group";
import {Registration} from "../entities/Registration";
import { createDocumentClient } from "../lib/AWS";

class GroupsController {
    private docClinet = createDocumentClient("Group");


    public async getWorkoutGroup(groupId): Promise<Group[]> {
        const params = { 
            TableName: "GroupsTable", 
            KeyConditionExpression: 'groupId = :i',
            ExpressionAttributeValues:  {':i': groupId}
        };
        const promise = this.docClinet.query(params).promise();
        return promise.then(res => <Group[]> res.Items).catch(err => {
            throw new Error(err);
        });
    };

    public async createGroup(data: any): Promise<Boolean> {
        data["createdTime"] = Date.now();
        data["groupId"] =  uniqid();
        data["savedClasses"] = [];
        data["scheduledClasses"] = [];
        data["pastClasses"] = [];
        return false;
    }
}



