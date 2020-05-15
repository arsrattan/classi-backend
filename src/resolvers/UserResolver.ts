import {Arg, Authorized, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entities/User";
import UserController from "../controllers/UserController";
import {UserInput} from "./inputs/user-input";
import {AuthData} from "../entities/AuthData";

@Resolver()
export class UserResolver {

    public userController: UserController = new UserController();

    @Query(() => AuthData)
    async login(@Arg("email") email: string,
                @Arg("password") password: string){
        return await this.userController.login(email, password);
    };

    @Query(() => [User], { nullable: true })
    async getUserById(@Arg("userId") userId: string){
        return await this.userController.getUserById(userId);
    };

    @Authorized()
    @Query(() => [User], { nullable: true })
    async getAllUsers(){
        return await this.userController.getAllUsers();
    };

    @Query(() => [User], { nullable: true })
    async getUserFollowers(@Arg("userId") userId: string){
        return await this.userController.getUserFollowers(userId);
    };

    @Query(() => Number, { nullable: true })
    async getNumFollowers(@Arg("userId") userId: string){
        return await this.userController.getNumFollowers(userId);
    };

    @Mutation(() => Boolean)
    async toggleFollow(@Arg("followingUser") followingUser: string,
                       @Arg("followedUser") followedUser: string,
                       @Arg("isUnfollow") isUnfollow: boolean){
        return await this.userController.toggleFollow(followingUser, followedUser, isUnfollow);
    };

    @Mutation(() => Boolean)
    async registerUser(@Arg("data") data: UserInput) {
        return await this.userController.registerUser(data);
    };

    @Mutation(() => Boolean)
    async updateUser(@Arg("data") data: UserInput,
                     @Arg("userId") userId: string) {
        return await this.userController.updateUser(data, userId);
    };

    @Mutation(() => Boolean)
    async deleteUserById(@Arg("userId") userId: string) {
        return await this.userController.deleteUserById(userId);
    }

}