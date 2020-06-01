import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Class} from "../entities/Class";
import ClassController from "../controllers/ClassController";
import {CreateClassInput, UpdateClassInput} from "./inputs/class-input";
import {isAuth, isCorrectUser, isCorrectUserFromJson} from "../auth/isAuth";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../lib/AWS";
import {CreateCommentInput} from "./inputs/comment-input";

@Resolver()
export class ClassResolver {

    public classController: ClassController = new ClassController();

    @UseMiddleware(isAuth)
    @Query(() => [Class], { nullable: true })
    async getClassById(@Arg("classId") classId: string){
        return await this.classController.getClassById(classId);
    };

    @UseMiddleware(isAuth)
    @Query(() => [Class], { nullable: true })
    async getAllClasses(){
        return await this.classController.getAllClasses();
    };

    @UseMiddleware(isCorrectUserFromJson)
    @Mutation(() => Boolean)
    async createClass(@Arg("data") data: CreateClassInput,
                      @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.classController.createClass(data, picture);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async addCommentToClass(@Arg("data") data: CreateCommentInput,
                            @Arg("classCreator") classCreator: string,
                            @Arg("classId") classId: string,
                          @Arg("userId") userId: string) {
        return await this.classController.addCommentToClass(userId, classCreator, classId, data);
    };

    // @UseMiddleware(isCorrectUser)
    // @Mutation(() => Boolean)
    // async likeComment(@Arg("commentId") commentId: string,
    //                   @Arg("userId") userId: string,
    //                   @Arg("commentCreator") commentCreator: string,
    //                   @Arg("isUnlike") isUnlike: boolean) {
    //     return await this.classController.likeComment(userId, commentCreator, commentId, isUnlike);
    // };

    @UseMiddleware(isCorrectUserFromJson)
    @Mutation(() => Boolean)
    async updateClassById(@Arg("data", {nullable: true}) data: UpdateClassInput,
                          @Arg("classId") classId: string,
                          @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.classController.updateClassById(classId, data, picture);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async likeClass(@Arg("userId") userId: string,
                    @Arg("classCreator") classCreator: string,
                    @Arg("classId") classId: string,
                    @Arg("isUnlike") isUnlike: boolean) {
        return await this.classController.likeClass(userId, classCreator, classId, isUnlike);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteClassById(@Arg("classId") classId: string,
                          @Arg("userId") userId: string) {
        return await this.classController.deleteClassById(classId, userId);
    }

}