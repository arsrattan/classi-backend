import {
    Arg,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import { User } from "../entities/User";
import UserController from "../controllers/UserController";
import { CreateUserInput, UserInput } from "./inputs/user-input";
import { AuthData } from "../entities/AuthData";
import { isAuth, isCorrectUser, isCorrectUserFromConfirmation } from "../auth/isAuth";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../lib/AWS";
import { Notification } from "../entities/Notification";
import Group from "../entities/Group";

@Resolver()
export class UserResolver {

    public userController: UserController = new UserController();

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getUserById(@Arg("userId") userId: string) {
        return await this.userController.getUserById(userId);
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getAllUsers() {
        return await this.userController.getAllUsers();
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getUserFollowers(@Arg("userId") userId: string) {
        return await this.userController.getUserFollowers(userId);
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getUserFollowing(@Arg("userId") userId: string) {
        return await this.userController.getUserFollowing(userId);
    };

    @UseMiddleware(isCorrectUser)
    @Query(() => [Notification], { nullable: true })
    async getUserNotifications(@Arg("userId") userId: string) {
        return await this.userController.getUserNotifications(userId);
    };

    @UseMiddleware(isAuth)
    @Query(() => Number, { nullable: true })
    async getNumFollowers(@Arg("userId") userId: string) {
        return await this.userController.getNumFollowers(userId);
    };

    @Mutation(() => AuthData)
    async login(@Arg("email") email: string,
        @Arg("password") password: string) {
        return await this.userController.login(email, password);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async toggleFollow(@Arg("userId") userId: string,
        @Arg("followedUser") followedUser: string,
        @Arg("isUnfollow") isUnfollow: boolean) {
        return await this.userController.toggleFollow(userId, followedUser, isUnfollow);
    };

    @Mutation(() => Boolean)
    async registerUser(@Arg("data", { nullable: true }) data: CreateUserInput) {
        return await this.userController.registerUser(data);
    };

    @UseMiddleware(isCorrectUserFromConfirmation)
    @Mutation(() => Boolean)
    async confirmUser(@Arg("token") token: string) {
        return await this.userController.confirmUser(token);
    };

    @UseMiddleware(isCorrectUserFromConfirmation)
    @Mutation(() => Boolean)
    async changePassword(@Arg("token") token: string,
        @Arg("password") password: string) {
        return await this.userController.changePassword(token, password);
    };

    @Mutation(() => Boolean)
    async forgotPassword(@Arg("email") email: string) {
        return await this.userController.forgotPassword(email);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async updateUser(@Arg("data", { nullable: true }) data: UserInput,
        @Arg("userId") userId: string) {
        return await this.userController.updateUser(userId, data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteUserById(@Arg("userId") userId: string) {
        return await this.userController.deleteUserById(userId);
    }


    @UseMiddleware(isAuth)
    @Query(() => [Group], { nullable: true })
    async getUserGroupsById(@Arg("userId") userId: string) {
        return await this.userController.getUserGroupsById(userId);
    }

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async addGroupById(@Arg("userId") userId: string,
        @Arg("groupId") groupId: string) {
        return await this.userController.addGroupById(userId, groupId);
    }

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async batchAddGroupById(@Arg("userIds") userIds: string[],
        @Arg("groupId") groupId: string) {
        return await this.userController.batchAddGroupById(userIds, groupId);
    }


    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteGroupById(@Arg("userId") userId: string,
        @Arg("groupId") groupId: string) {
        return await this.userController.deleteGroupById(userId, groupId);
    }

}