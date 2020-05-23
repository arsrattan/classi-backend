import {InputType, Field} from "type-graphql";
import {Class} from "../../entities/Class";
import {GraphQLJSONObject} from "graphql-type-json";
import ClassType from "../../enums/ClassType";
import Equipment from "../../enums/Equipment";
import Difficulty from "../../enums/Difficulty";
import {Comment} from "../../entities/Comment";

@InputType()
export class UpdateClassInput implements Partial<Class> {

    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    className: string;
    @Field({ nullable: true })
    classType: ClassType;
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
    isPrivate: boolean;
    @Field({ nullable: true })
    scheduledTime: number;
}

@InputType()
export class CreateClassInput implements Partial<Class> {
    @Field()
    className: string;
    @Field()
    classType: ClassType;
    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    description: string;
    @Field()
    requiredEquipment: Equipment;
    @Field()
    difficulty: Difficulty;
    @Field({ nullable: true })
    expectedDuration: string;
    @Field()
    isPrivate: boolean;
    @Field()
    scheduledTime: number;
}
