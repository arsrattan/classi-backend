import {Field, ID, ObjectType} from "type-graphql";
import ClassType from "../enums/ClassType";
import Equipment from "../enums/Equipment";
import Difficulty from "../enums/Difficulty";
import {GraphQLJSONObject} from "graphql-type-json";
import {Comment} from "./Comment";

@ObjectType({ description: "The Class model" })
export class Class {

    @Field(() => ID)
    classId!: string;
    @Field()
    className: string;
    @Field({nullable: true})
    imageKey: string;
    @Field()
    classType: ClassType;
    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    description: string;
    @Field()
    requiredEquipment: Equipment;
    @Field({ nullable: true })
    difficulty: Difficulty;
    @Field({ nullable: true })
    expectedDuration: string;
    @Field()
    isPrivate: boolean;
    @Field()
    scheduledTime: number;
    @Field()
    createdAt: number;
    @Field(_type => GraphQLJSONObject, { nullable: true })
    comments: Comment[];
}