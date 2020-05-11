import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {User} from "../entities/Users";
import UserController from "../controllers/UserController";
import {UserInput} from "./inputs/user-input";

@Resolver()
export class UserResolver {

    public userController: UserController = new UserController();

    @Query(() => [User], { nullable: true })
    async getUserById(@Arg("userId") userId: string){
        return await this.userController.getUserById(userId);
    };

    @Query(() => [User], { nullable: true })
    async getAllUsers(){
        return await this.userController.getAllUsers();
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