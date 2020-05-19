import {
    Arg,
    Args, ArgsType, Field, ID,
    Mutation,
    Publisher,
    PubSub,
    Query,
    Resolver,
    ResolverFilterData,
    Root,
    Subscription,
    UseMiddleware
} from "type-graphql";
import {User} from "../entities/User";
import UserController from "../controllers/UserController";
import {CreateUserInput, UserInput} from "./inputs/user-input";
import {AuthData} from "../entities/AuthData";
import {isAuth, isCorrectUser, isCorrectUserFromConfirmation} from "../auth/isAuth";
import {Topic} from "../subscriptions/topics";
import {GraphQLJSONObject} from "graphql-type-json";

export interface NewClassPayload {
    message: string;
}

@ArgsType()
export class NewClassArgs {
    @Field(type => ID)
    recipeId: string;
}

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

    @UseMiddleware(isAuth)
    @Query(() => Number, { nullable: true })
    async getNumFollowers(@Arg("userId") userId: string){
        return await this.userController.getNumFollowers(userId);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async toggleFollow(@Arg("userId") userId: string,
                       @Arg("followedUser") followedUser: string){
        return await this.userController.toggleFollow(userId, followedUser);
    };

    @Mutation(() => Boolean)
    async registerUser(@Arg("data") data: CreateUserInput,
                       @PubSub(Topic.NewClass) notifyGotClasses: Publisher<NewClassPayload>) {
        const isRegistered: Boolean = await this.userController.registerUser(data);
        if(isRegistered.valueOf() == true){
            await notifyGotClasses({ message: "yah" })
        }
        return isRegistered;
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
    async updateUser(@Arg("data") data: UserInput,
                     @Arg("userId") userId: string) {
        return await this.userController.updateUser(data, userId);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteUserById(@Arg("userId") userId: string) {
        return await this.userController.deleteUserById(userId);
    }

    @Subscription(() => GraphQLJSONObject, {
        topics: Topic.NewClass,
        // filter: ({ payload, args }: ResolverFilterData<NewClassPayload, NewClassArgs>) => {
        //     return payload.message === args.recipeId;
        // },
    })
    newComments(@Root() newComment: NewClassPayload): any {
        return {
            message: 'testing123123',
        };
    }

}