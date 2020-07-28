import {InputType, Field} from "type-graphql";
import Group from "../../entities/Group";
import { Registration } from "../../entities/Registration";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class UpdateGroupInput implements Partial<Group> {
    @Field()
    groupId: string;
    
    @Field({ nullable: true })
    name: string; 
    
    @Field(_type => [String], {nullable: true})
    members: string[]; 
    
    @Field(_type => [String], {nullable: true})
    savedClasses: string[];
    
    @Field(_type => [GraphQLJSONObject], { nullable: true })
    scheduledClasses: Registration[]; 
}

@InputType()
export class CreateGroupInput implements Partial<Group> {
    @Field()
    name: string; 
    
    @Field(_type => [String])
    members: string[]; 
    
    @Field(_type => [String], {nullable: true})
    savedClasses: string[];
    
    @Field(_type => [GraphQLJSONObject], {nullable: true})
    scheduledClasses: Registration[]; 
}