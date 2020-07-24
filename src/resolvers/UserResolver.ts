import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../entities/User";
import UserController from "../controllers/UserController";
import { CreateUserInput, UserInput } from "./inputs/user-input";
import { AuthData } from "../entities/AuthData";
import {
  isAuth,
  isCorrectUser,
  isCorrectUserFromConfirmation,
} from "../auth/isAuth";
import { GraphQLUpload } from "graphql-upload";
import { Upload } from "../lib/AWS";
import { Notification } from "../entities/Notification";

@Resolver(User)
export class UserResolver {
  private userController: UserController = new UserController();

  // @UseMiddleware(isAuth)
  @Query((returns) => User, { nullable: true })
  async getUserById(@Arg("userId") userId: string) {
    return await this.userController.getUserById(userId);
  }

  // @UseMiddleware(isAuth)
  @Query((returns) => [User], { nullable: true })
  async getAllUsers() {
    return await this.userController.getAllUsers();
  }

//   // @UseMiddleware(isAuth)
//   @Query((returns) => [User], { nullable: true })
//   async getUserFollowers(@Arg("userId") userId: string) {
//     return await this.userController.getUserFollowers(userId);
//   }

//   // @UseMiddleware(isAuth)
//   @Query((returns) => [User], { nullable: true })
//   async getUserFollowing(@Arg("userId") userId: string) {
//     return await this.userController.getUserFollowing(userId);
//   }

//   // @UseMiddleware(isCorrectUser)
//   @Query((returns) => [Notification], { nullable: true })
//   async getUserNotifications(@Arg("userId") userId: string) {
//     return await this.userController.getUserNotifications(userId);
//   }

//   // @UseMiddleware(isAuth)
//   @Query((returns) => Number, { nullable: true })
//   async getNumFollowers(@Arg("userId") userId: string) {
//     return await this.userController.getNumFollowers(userId);
//   }

//   @Mutation((returns) => AuthData)
//   async login(
//     @Arg("username") username: string,
//     @Arg("password") password: string
//   ) {
//     return await this.userController.login(username, password);
//   }

//   // @UseMiddleware(isCorrectUser)
//   @Mutation((returns) => Boolean)
//   async toggleFollow(
//     @Arg("userId") userId: string,
//     @Arg("followedUser") followedUser: string,
//     @Arg("isUnfollow") isUnfollow: boolean
//   ) {
//     return await this.userController.toggleFollow(
//       userId,
//       followedUser,
//       isUnfollow
//     );
//   }

  @Mutation((returns) => Boolean)
  async registerUser(@Arg("data", { nullable: true }) data: CreateUserInput) {
    const {
      username,
      password,
      email,
      dateOfBirth,
      firstName,
      lastName,
    } = data;
    return await this.userController.registerUser(
      email,
      firstName,
      lastName,
      username,
      password,
      dateOfBirth
    );
    // return await this.userController.registerUser(data);
  }

//   // @UseMiddleware(isCorrectUserFromConfirmation)
//   @Mutation((returns) => Boolean)
//   async confirmUser(@Arg("token") token: string) {
//     return await this.userController.confirmUser(token);
//   }

//   // @UseMiddleware(isCorrectUserFromConfirmation)
//   @Mutation((returns) => Boolean)
//   async changePassword(
//     @Arg("token") token: string,
//     @Arg("password") password: string
//   ) {
//     return await this.userController.changePassword(token, password);
//   }

//   @Mutation((returns) => Boolean)
//   async forgotPassword(@Arg("email") email: string) {
//     return await this.userController.forgotPassword(email);
//   }

//   // @UseMiddleware(isCorrectUser)
//   @Mutation((returns) => Boolean)
//   async updateUser(
//     @Arg("data", { nullable: true }) data: UserInput,
//     @Arg("userId") userId: string
//   ) {
//     return await this.userController.updateUser(userId, data);
//   }

//   // @UseMiddleware(isCorrectUser)
//   @Mutation((returns) => Boolean)
//   async deleteUserById(@Arg("userId") userId: string) {
//     return await this.userController.deleteUserById(userId);
//   }
}
