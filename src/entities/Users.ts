import {Field, ID, ObjectType} from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json'
import AccountType from "../enums/AccountType";
import {Class} from "./Classes";


@ObjectType({ description: "The User model" })
export class User {

    @Field(() => ID)
    userId!: string;
    @Field()
    email: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    password: string;
    @Field()
    biography: string;
    @Field()
    accountType: AccountType;
    @Field()
    creationDate: Date;
    @Field(_type => GraphQLJSONObject)
    classHistory: Class[];
    @Field(_type => GraphQLJSONObject)
    upcomingClasses: Class[];
    @Field(_type => GraphQLJSONObject)
    followers: User[];
    @Field(_type => GraphQLJSONObject)
    following: User[];

}