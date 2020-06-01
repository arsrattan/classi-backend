import {
    Arg,
    Mutation,
    Query,
    Resolver,
    UseMiddleware
} from "type-graphql";
import {User} from "../entities/User";
import UserController from "../controllers/UserController";
import {CreateUserInput, UserInput} from "./inputs/user-input";
import {AuthData} from "../entities/AuthData";
import {isAuth, isCorrectUser, isCorrectUserFromConfirmation} from "../auth/isAuth";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../lib/AWS";
import {Notification} from "../entities/Notification";

@Resolver()
export class UserResolver {

    public userController: UserController = new UserController();

    @Query(() => AuthData)
    async login(@Arg("email") email: string,
                @Arg("password") password: string){
        return await this.userController.login(email, password);
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getUserById(@Arg("userId") userId: string){
        return await this.userController.getUserById(userId);
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getAllUsers(){
        return await this.userController.getAllUsers();
    };

    @UseMiddleware(isAuth)
    @Query(() => [User], { nullable: true })
    async getUserFollowers(@Arg("userId") userId: string){
        return await this.userController.getUserFollowers(userId);
    };

    @UseMiddleware(isCorrectUser)
    @Query(() => [Notification], { nullable: true })
    async getUserNotifications(@Arg("userId") userId: string){
        return await this.userController.getUserNotifications(userId);
    };

    @UseMiddleware(isAuth)
    @Query(() => Number, { nullable: true })
    async getNumFollowers(@Arg("userId") userId: string){
        return await this.userController.getNumFollowers(userId);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async toggleFollow(@Arg("userId") userId: string,
                       @Arg("followedUser") followedUser: string,
                       @Arg("isUnfollow") isUnfollow: boolean){
        return await this.userController.toggleFollow(userId, followedUser, isUnfollow);
    };

    @Mutation(() => Boolean)
    async registerUser(@Arg("data", {nullable: true}) data: CreateUserInput,
                       @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.userController.registerUser(data, picture);
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
    async updateUser(@Arg("data", {nullable: true}) data: UserInput,
                     @Arg("userId") userId: string,
                     @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.userController.updateUser(userId, data, picture);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteUserById(@Arg("userId") userId: string) {
        return await this.userController.deleteUserById(userId);
    }

}