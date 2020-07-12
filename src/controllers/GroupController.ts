import { Request, Response } from "express";
import uniqid from 'uniqid';
import Group from "../entities/Group";
// import {Registration} from "../entities/Registration";
import { createDocumentClient } from "../lib/AWS";
import UserController from "./UserController";

const groupTable = "class-workout-groups" // move to config file later

class GroupController {
    private docClient = createDocumentClient("Group");
    private userController = new UserController();
    
    // get workoutGroups by id
    public async getWorkoutGroupById(groupId): Promise<Group[]> {
        const params = {
            TableName: groupTable,
            KeyConditionExpression: 'groupId = :i',
            ExpressionAttributeValues: { ':i': groupId }
        };
        const groupObj = this.docClient.query(params).promise();
        return groupObj.then(res => <Group[]>res.Items).catch(err => {
            throw new Error(err);
        });
    };

    // get all workoutGroups given array of ids
    public async batchGetWorkoutGroupByIds(groupIds: string[]): Promise<Group[]> {
        const keys: any[] = [];
        groupIds.forEach(x => keys.push({ groupId: x }));

        const params = {
            RequestItems: {
                groupTable: {
                    Keys: keys
                }
            }
        };
        const groupsRes: Group[] = [];
        await this.docClient.batchGet(params, function (err, data) {
            if (err) console.log(err);
            else {
                data.Responses.groupTable.forEach(function (element) {
                    groupsRes.push(element as Group);
                });
            }
        }).promise();

        return groupsRes;
    };


    // need to add middleware function to do paramValidation
    public async createGroup(data: any): Promise<Boolean> {
        // add groupId to each user's groups list 

        data["createdTime"] = Date.now();
        data["groupId"] = uniqid();
        data["savedClasses"] = [];
        data["scheduledClasses"] = [];
        data["pastClasses"] = [];

        const params = {
            TableName: groupTable,
            Item: data
        };
        try {
            await this.docClient.put(params).promise();

            // add groupId to user.userGroups for each user
            return true;
        } catch (err) {
            throw new Error(err)
        }
    }

    // do not use this method to update members list
    public async updateGroupById(groupId: string, data: any): Promise<Boolean> {
        // do not use this method to update members list

        let updateExpression = "SET";
        let expressionAttValues: any = {};
        const keys = Object.keys(data)
        for (let i = 0; i < keys.length; i++) {
            expressionAttValues[":" + keys[i]] = data[keys[i]];
            updateExpression += " " + keys[i] + " = :" + keys[i];
            if (!(i == keys.length - 1)) updateExpression += ",";
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
        } catch (err) {
            throw new Error(err)
        }

    }

    public async deleteGroupById(groupId: string, userId: string): Promise<Boolean> {
        // Go through Group members and delete this group from each user's list

        const params = {
            TableName: groupTable,
            Key: { "groupId": groupId },
            ConditionExpression: "members CONTAINS (:userId)",
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }
        try {
            await this.docClient.delete(params).promise();
            return true;
        } catch (err) {
            throw new Error(err)
        }
    }

}

export default GroupController;



