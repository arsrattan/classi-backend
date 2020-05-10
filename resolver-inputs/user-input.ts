import { InputType, Field } from "type-graphql";
import {User} from "../entities/Users";
import {IsEmail} from "class-validator";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    userId: string;
    @Field()
    @IsEmail()
    email: string;
    //add more here, this is just a POC
}
