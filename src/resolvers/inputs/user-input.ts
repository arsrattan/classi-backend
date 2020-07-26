import { InputType, Field } from "type-graphql";
import {User} from "../../entities/User";
import {IsEmail} from "class-validator";
import AccountType from "../../enums/AccountType";
import {GraphQLJSONObject} from "graphql-type-json";

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
    @Field(_type => GraphQLJSONObject, {nullable: true})
    userGroups: [string];
}

@InputType()
export class CreateUserInput implements Partial<User> {
    @Field()
    userId: string;
    @Field()
    username: string;
    @Field()
    dateOfBirth: string;
    @Field({nullable: true})
    @IsEmail()
    email: string;
    @Field({nullable: true})
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field({nullable: true})
    s3url: string;
    @Field(_type => GraphQLJSONObject, {nullable: true})
    userGroups: [string];
    @Field({nullable: true})
    fbOrIgLogin: boolean;
}