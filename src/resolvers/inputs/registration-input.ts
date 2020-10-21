import {InputType, Field, ID} from "type-graphql";
import {Registration} from "../../entities/Registration";

@InputType()
export class RegistrationInput implements Partial<Registration> {
    @Field({nullable: true})
    username: string
    @Field({nullable: true})
    groupId: string;
    @Field({nullable: true})
    scheduledTime: number;
    @Field({nullable: true})
    classId: string;
}
