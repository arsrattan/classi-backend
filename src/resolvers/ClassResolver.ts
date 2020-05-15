import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {Class} from "../entities/Class";
import ClassController from "../controllers/ClassController";
import {ClassInput} from "./inputs/class-input";
import {isAuth} from "../auth/isAuth";

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

    @Mutation(() => Boolean)
    async createClass(@Arg("data") data: ClassInput) {
        return await this.classController.createClass(data);
    };

    @Mutation(() => Boolean)
    async updateClassById(@Arg("data") data: ClassInput,
                          @Arg("classId") classId: string) {
        return await this.classController.updateClassById(data, classId);
    };

    @Mutation(() => Boolean)
    async deleteClassById(@Arg("classId") classId: string) {
        return await this.classController.deleteClassById(classId);
    }

}