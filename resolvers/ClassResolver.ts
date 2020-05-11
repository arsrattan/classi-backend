import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {Class} from "../entities/Classes";
import ClassController from "../controllers/ClassController";
import {ClassInput} from "../resolver-inputs/class-input";

@Resolver()
export class ClassResolver {

    public classController: ClassController = new ClassController();

    @Query(() => [Class], { nullable: true })
    async getClassById(@Arg("classId") classId: string){
        return await this.classController.getClassById(classId);
    };

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