import {InputType, Field, ID} from "type-graphql";
import {Class} from "../../entities/Class";
import {GraphQLJSONObject} from "graphql-type-json";
import {User} from "../../entities/User";
import ClassType from "../../enums/ClassType";
import Equipment from "../../enums/Equipment";
import Difficulty from "../../enums/Difficulty";
import Privacy from "../../enums/Privacy";
import {Comment} from "../../entities/Comment";
import {UserInput} from "./user-input";

@InputType()
export class ClassInput implements Partial<Class> {

    @Field(() => ID, { nullable: true })
    classId: string;
    @Field({ nullable: true })
    className: string;
    @Field({ nullable: true })
    classType: ClassType;
    @Field(_type => UserInput, { nullable: true })
    instructor: User;
    @Field(_type => GraphQLJSONObject, { nullable: true })
    commentToAdd: Comment;
    @Field(_type => GraphQLJSONObject, { nullable: true })
    commentToDelete: Comment;
    @Field({ nullable: true })
    description: string;
    @Field({ nullable: true })
    requiredEquipment: Equipment;
    @Field({ nullable: true })
    difficulty: Difficulty;
    @Field({ nullable: true })
    expectedDuration: string;
    @Field({ nullable: true })
    privacy: Privacy;
    @Field({ nullable: true })
    scheduledTime: Date;
}
