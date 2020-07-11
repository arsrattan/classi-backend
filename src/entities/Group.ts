import Registration from './Registration'; 
import {GraphQLJSONObject} from "graphql-type-json";
import {Field, ID, ObjectType} from "type-graphql";


@ObjectType("Group")
export default class Group {
    
    @Field(() => ID)
    groupId: string;
    
    @Field()
    name: string; //groupName
    
    @Field()
    members: string[]; // array of userIds 
    
    @Field({nullable: true})
    savedClasses: string[];
    
    @Field({nullable: true})
    scheduledClasses: Registration[]; // array of class ids 
    
    @Field({nullable: true})
    pastClasses: Registration[]; //pick any user and scan table for groupId
    
    @Field()
    createdTime: number; 

}