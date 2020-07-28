import {Registration} from './Registration'; 
import {GraphQLJSONObject} from "graphql-type-json";
import {Field, ID, ObjectType} from "type-graphql";


@ObjectType("Group")
export default class Group {
    
    @Field(() => ID)
    groupId: string;
    
    @Field()
    name: string; //groupName
    
    @Field(_type => [String], {nullable: true})
    members: string[]; // array of userIds 
    
    @Field(_type => [String], {nullable: true})
    savedClasses: string[];
    
    @Field(_type => [Registration], {nullable: true})
    scheduledClasses: Registration[]; // array of class ids 
    
    @Field(_type => [Registration], {nullable: true})
    pastClasses: Registration[]; //pick any user and scan table for groupId
    
    @Field()
    createdTime: number; 

}