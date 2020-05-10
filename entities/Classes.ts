import {Field, ID, ObjectType} from "type-graphql";
import ClassType from "../enums/ClassType";
import Equipment from "../enums/Equipment";
import Difficulty from "../enums/Difficulty";
import Privacy from "../enums/Privacy";
import {GraphQLJSONObject} from "graphql-type-json";
import {User} from "./Users";

@ObjectType({ description: "The Class model" })
export class Class {

    @Field(() => ID)
    classId!: string;
    @Field()
    className: string;
    @Field()
    classType: string;
    @Field(_type => GraphQLJSONObject)
    instructor: User;
    @Field()
    description: string;
    @Field()
    workoutType: ClassType;
    @Field()
    requiredEquipment: Equipment;
    @Field()
    difficulty: Difficulty;
    @Field()
    expectedDuration: string;
    @Field()
    privacy: Privacy;
    @Field()
    scheduledTime: Date;
}