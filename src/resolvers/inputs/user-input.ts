import { InputType, Field } from "type-graphql";
import {User} from "../../entities/Users";
import {IsEmail} from "class-validator";
import AccountType from "../../enums/AccountType";
import {GraphQLJSONObject} from "graphql-type-json";
import {Class} from "../../entities/Classes";

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
    @Field({ nullable: true })
    accountType: AccountType;
    @Field({ nullable: true })
    creationDate: Date;
    @Field(_type => GraphQLJSONObject, { nullable: true })
    classHistory: Class[];
    @Field(_type => GraphQLJSONObject, { nullable: true })
    upcomingClasses: Class[];
    @Field(_type => GraphQLJSONObject, { nullable: true })
    followers: User[];
    @Field(_type => GraphQLJSONObject, { nullable: true })
    following: User[];
}
