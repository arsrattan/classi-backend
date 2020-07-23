import {InputType, Field} from "type-graphql";
import Group from "../../entities/Group";
import {Registration} from "../../entities/Registration";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class UpdateGroupInput implements Partial<Group> {
    @Field()
    groupId: string;
    
    @Field({ nullable: true })
    name: string; 
    
    @Field(_type => GraphQLJSONObject, {nullable: true})
    members: string[]; 
    
    @Field(_type => GraphQLJSONObject, {nullable: true})
    savedClasses: string[];
    
    @Field(type => Registration, { nullable: true })
    scheduledClasses: Registration[]; 
}

@InputType()
export class CreateGroupInput implements Partial<Group> {
    @Field()
    groupId: string;
    
    @Field()
    name: string; 
    
    @Field()
    members: string[]; 
    
    @Field({nullable: true})
    savedClasses: string[];
    
    @Field({nullable: true})
    scheduledClasses: Registration[]; 
}