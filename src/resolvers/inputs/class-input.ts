import {InputType, Field} from "type-graphql";
import {Class} from "../../entities/Class";
import ClassType from "../../enums/ClassType";
import Equipment from "../../enums/Equipment";
import Difficulty from "../../enums/Difficulty";
import Duration from "../../enums/Duration";

@InputType()
export class UpdateClassInput implements Partial<Class> {

    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    className: string;
    @Field({ nullable: true })
    classType: string;
    @Field({ nullable: true })
    description: string;
    @Field({nullable: true})
    channel_thumbnail_url: string;
    @Field({nullable: true})
    class_image_url: string;
    @Field(type => Equipment, { nullable: true })
    requiredEquipment: Equipment;
    @Field({ nullable: true })
    difficulty: string;
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
    classType: string;
    @Field()
    instructorUserId: string;
    @Field({ nullable: true })
    description: string;
    @Field({nullable: true})
    channel_thumbnail_url: string;
    @Field({nullable: true})
    class_image_url: string;
    @Field(type => Equipment)
    requiredEquipment: Equipment;
    @Field()
    difficulty: string;
    @Field()
    expectedDuration: string;
    @Field()
    isPrivate: boolean;
    @Field({ nullable: true })
    scheduledTime: number;
}
