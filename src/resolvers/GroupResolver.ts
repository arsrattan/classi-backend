import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import Group from "../entities/Group";
import {isAuth, isCorrectUser, isCorrectUserFromJson} from "../auth/isAuth";
import GroupController from "../controllers/GroupController";
import { CreateGroupInput, UpdateGroupInput } from "./inputs/group-input";

@Resolver()
export class GroupResolver {
    public groupController: GroupController = new GroupController();

    // get group by id
    // @UseMiddleware(isAuth)
    @Query(() => [Group], { nullable: true })
    async getGroupById(@Arg("groupId") groupId: string){
        return await this.groupController.getWorkoutGroupById(groupId);
    };

    // create group
    // @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async createGroup(@Arg("data") data: CreateGroupInput) {
        return await this.groupController.createGroup(data);
    };

    // update group by id
    // @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async updateGroupById(@Arg("data", {nullable: true}) data: UpdateGroupInput,
                          @Arg("groupId") groupId: string) {
        return await this.groupController.updateGroupById(groupId, data);
    };

    // delete group by id
    // @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async deleteGroupById(@Arg("groupId") groupId: string,
                          @Arg("userId") userId: string) {
        return await this.groupController.deleteGroupById(groupId, userId);
    };




}