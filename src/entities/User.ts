import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import AccountType from "../enums/AccountType";
<<<<<<< Updated upstream
import { Notification } from "./Notification";
=======
import {Notification} from "./Notification";
>>>>>>> Stashed changes

@ObjectType("User", { description: "A registered Classi user profile" })
export class User {
<<<<<<< Updated upstream
  @Field((type) => ID)
  userId!: string;
  @Field()
  email: string;
  @Field({ nullable: true })
  imageKey?: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  s3url?: string;
  @Field({ nullable: true })
  biography?: string;
  @Field((type) => AccountType)
  accountType: AccountType;
  @Field()
  createdAt: number;
  @Field((_type) => [GraphQLJSONObject], { nullable: "items" })
  notifications: Notification[];
  @Field()
  confirmed: boolean;
=======

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
>>>>>>> Stashed changes
}
