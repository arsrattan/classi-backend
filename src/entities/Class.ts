import {Field, ID, ObjectType} from "type-graphql";
import ClassType from "../enums/ClassType";
import Equipment from "../enums/Equipment";
import Difficulty from "../enums/Difficulty";
import {GraphQLJSONObject} from "graphql-type-json";
import {Comment} from "./Comment";
import Duration from "../enums/Duration";

@ObjectType("Class")
export class Class {

    @Field(() => ID)
    classId!: string;
    @Field()
    className: string;
    @Field({nullable: true})
    imageKey: string;
    @Field(type => ClassType)
    classType: ClassType;
    @Field()
    instructorUserId: string;
    @Field({nullable: true})
    s3url: string;
    @Field({ nullable: true })
    description: string;
    @Field(type => Equipment)
    requiredEquipment: Equipment;
    @Field(type => Difficulty, { nullable: true })
    difficulty: Difficulty;
    @Field(type => Duration)
    expectedDuration: Duration;
    @Field()
    isPrivate: boolean;
    @Field()
    scheduledTime: number;
    @Field()
    createdAt: number;
    @Field(_type => GraphQLJSONObject, { nullable: true })
    comments: Comment[];
    @Field( _type => GraphQLJSONObject, {nullable: true})
    likes: any; //set of userids
    @Field( _type => GraphQLJSONObject, {nullable: true})
    registeredUsers: any; //set of userids
}
