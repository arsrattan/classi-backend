import { InputType, Field } from "type-graphql";
import {User} from "../../entities/User";
import {IsEmail} from "class-validator";
import AccountType from "../../enums/AccountType";
import {GraphQLJSONObject} from "graphql-type-json";
import {Class} from "../../entities/Class";

@InputType()
export class UserInput implements Partial<User> {
    @Field()
    userId: string;
    @Field({ nullable: true })
    @IsEmail()
    email: string;
    @Field({ nullable: true })
    firstName: string;
    @Field({ nullable: true })
    lastName: string;
    @Field({ nullable: true })
    password: string;
    @Field({ nullable: true })
    biography: string;
    @Field(type => AccountType, { nullable: true })
    accountType: AccountType;
    @Field({nullable: true})
    s3url: string;
}

@InputType()
export class CreateUserInput implements Partial<User> {
    @Field()
    userId: string;
    @Field()
    @IsEmail()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field({nullable: true})
    s3url: string;
}