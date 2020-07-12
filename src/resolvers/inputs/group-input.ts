import {InputType, Field} from "type-graphql";
import Group from "../../entities/Group";
import Registration from "../../entities/Registration";

@InputType()
export class UpdateGroupInput implements Partial<Group> {
    @Field()
    groupId: string;
    
    @Field({ nullable: true })
    name: string; 
    
    @Field({nullable: true})
    members: string[]; 
    
    @Field({nullable: true})
    savedClasses: string[];
    
    @Field({nullable: true})
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