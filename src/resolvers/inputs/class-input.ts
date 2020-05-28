import {InputType, Field} from "type-graphql";
import {Class} from "../../entities/Class";
import ClassType from "../../enums/ClassType";
import Equipment from "../../enums/Equipment";
import Difficulty from "../../enums/Difficulty";

@InputType()
export class UpdateClassInput implements Partial<Class> {

    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    className: string;
    @Field(type => ClassType, { nullable: true })
    classType: ClassType;
    @Field({ nullable: true })
    description: string;
    @Field(type => Equipment, { nullable: true })
    requiredEquipment: Equipment;
    @Field(type => Difficulty, { nullable: true })
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
    @Field(type => ClassType)
    classType: ClassType;
    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    description: string;
    @Field(type => Equipment)
    requiredEquipment: Equipment;
    @Field(type => Difficulty)
    difficulty: Difficulty;
    @Field({ nullable: true })
    expectedDuration: string;
    @Field()
    isPrivate: boolean;
    @Field()
    scheduledTime: number;
}
