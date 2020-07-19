import {
  Arg,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
  Authorized,
} from "type-graphql";
import { Class } from "../entities/Class";
import ClassController from "../controllers/ClassController";
import { CreateClassInput, UpdateClassInput } from "./inputs/class-input";
import { isAuth, isCorrectUser, isCorrectUserFromJson } from "../auth/isAuth";
import { CreateCommentInput } from "./inputs/comment-input";

@Resolver()
export class ClassResolver {
  public classController: ClassController = new ClassController();

  // @UseMiddleware(isAuth)
  @Query(() => [Class], { nullable: true })
  async getClassById(@Arg("classId") classId: string) {
    return await this.classController.getClassById(classId);
  }

  // @UseMiddleware(isAuth)
  @Authorized()
  @Query(() => [Class], { nullable: true })
  async getAllClasses() {
    return await this.classController.getAllClasses();
  }

  // @UseMiddleware(isCorrectUserFromJson)
  @Mutation(() => Boolean)
  async createClass(@Arg("data") data: CreateClassInput) {
    return await this.classController.createClass(data);
  }

  // @UseMiddleware(isCorrectUser)
  @Mutation(() => Boolean)
  async addCommentToClass(
    @Arg("data") data: CreateCommentInput,
    @Arg("classCreator") classCreator: string,
    @Arg("classId") classId: string,
    @Arg("userId") userId: string
  ) {
    return await this.classController.addCommentToClass(
      userId,
      classCreator,
      classId,
      data
    );
  }

  // // @UseMiddleware(isCorrectUser)
  // @Mutation(() => Boolean)
  // async likeComment(@Arg("commentId") commentId: string,
  //                   @Arg("userId") userId: string,
  //                   @Arg("commentCreator") commentCreator: string,
  //                   @Arg("isUnlike") isUnlike: boolean) {
  //     return await this.classController.likeComment(userId, commentCreator, commentId, isUnlike);
  // };

  // @UseMiddleware(isCorrectUserFromJson)
  @Mutation(() => Boolean)
  async updateClassById(
    @Arg("data", { nullable: true }) data: UpdateClassInput,
    @Arg("classId") classId: string
  ) {
    return await this.classController.updateClassById(classId, data);
  }

  // @UseMiddleware(isCorrectUser)
  @Mutation(() => Boolean)
  async likeClass(
    @Arg("userId") userId: string,
    @Arg("classCreator") classCreator: string,
    @Arg("classId") classId: string,
    @Arg("isUnlike") isUnlike: boolean
  ) {
    return await this.classController.likeClass(
      userId,
      classCreator,
      classId,
      isUnlike
    );
  }

  // @UseMiddleware(isCorrectUser)
  @Mutation(() => Boolean)
  async registerForClass(
    @Arg("userId") userId: string,
    @Arg("classId") classId: string,
    @Arg("scheduledTime") scheduledTime: number
  ) {
    return await this.classController.registerForClass(
      userId,
      classId,
      scheduledTime
    );
  }

  // @UseMiddleware(isCorrectUser)
  @Mutation(() => Boolean)
  async deleteClassById(
    @Arg("classId") classId: string,
    @Arg("userId") userId: string
  ) {
    return await this.classController.deleteClassById(classId, userId);
  }
}
