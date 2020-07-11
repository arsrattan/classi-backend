import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

@ObjectType("Registration")
export default class Registration {
    @Field()
    registrationId: string;
    
    @Field()
    userId: string; //user who registered themselves or a group for the class
    
    @Field({nullable: true})
    groupId?: string; //If a user is registering a whole group for a class
    
    @Field()
    classId: string;
    
    @Field()
    scheduledTime: Date;
    
    @Field()
    createdAt: string;

}