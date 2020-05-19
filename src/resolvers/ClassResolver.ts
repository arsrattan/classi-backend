import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Class} from "../entities/Class";
import ClassController from "../controllers/ClassController";
import {CreateClassInput, UpdateClassInput} from "./inputs/class-input";
import {isAuth, isCorrectUser, isCorrectUserFromJson} from "../auth/isAuth";

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
    async createClass(@Arg("data") data: CreateClassInput) {
        return await this.classController.createClass(data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async addCommentToClass(@Arg("data") data: UpdateClassInput,
                          @Arg("userId") userId: string) {
        return await this.classController.addCommentToClass(data, userId);
    };

    @UseMiddleware(isCorrectUserFromJson)
    @Mutation(() => Boolean)
    async updateClassById(@Arg("data") data: UpdateClassInput,
                          @Arg("classId") classId: string) {
        return await this.classController.updateClassById(data, classId);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteClassById(@Arg("classId") classId: string,
                          @Arg("userId") userId: string) {
        return await this.classController.deleteClassById(classId, userId);
    }

}