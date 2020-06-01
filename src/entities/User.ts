import {Field, ID, ObjectType} from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json'
import AccountType from "../enums/AccountType";
import {Class} from "./Class";
import {Notification} from "./Notification";

@ObjectType("User")
export class User {

    @Field(() => ID)
    userId!: string;
    @Field()
    email: string;
    @Field({nullable: true})
    imageKey: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field()
    password: string;
    @Field({nullable: true})
    biography: string;
    @Field(type => AccountType)
    accountType: AccountType;
    @Field()
    createdAt: number;
    @Field(_type => GraphQLJSONObject)
    classHistory: Class[];
    @Field(_type => GraphQLJSONObject)
    registeredClasses: Class[];
    @Field(_type => GraphQLJSONObject)
    followers: User[];
    @Field(_type => GraphQLJSONObject)
    following: User[];
    @Field(_type => GraphQLJSONObject)
    notifications: Notification[];
    @Field()
    confirmed: boolean;
}