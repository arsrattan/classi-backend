import {Field, ID, ObjectType} from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json'
import AccountType from "../enums/AccountType";
import {Notification} from "./Notification";

@ObjectType("User")
export class User {

    @Field(() => ID)
    userId!: string;
    @Field({nullable: true})
    email: string;
    @Field({nullable: true})
    imageKey: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field({nullable: true})
    password: string;
    @Field({nullable: true})
    s3url: string;
    @Field({nullable: true})
    biography: string;
    @Field(type => AccountType)
    accountType: AccountType;
    @Field()
    createdAt: number;
    @Field(_type => GraphQLJSONObject)
    notifications: Notification[];
    @Field()
    confirmed: boolean;
    @Field({nullable: true})
    fbOrIgLogin: boolean;
    @Field(_type => GraphQLJSONObject, {nullable: true})
    userGroups: [string] // array of groupIds a user is a part of
}
