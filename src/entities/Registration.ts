import {Field, ID, ObjectType} from "type-graphql";

@ObjectType("Registration")
export class Registration {
    @Field()
    registrationId: string;

    @Field()
    username: string; //user who registered themselves or a group for the class
    
    @Field({nullable: true})
    groupId: string; //If a user is registering a whole group for a class
    
    @Field()
    classId: string;
    
    @Field()
    scheduledTime: number;
    
    @Field()
    createdAt: number;

}