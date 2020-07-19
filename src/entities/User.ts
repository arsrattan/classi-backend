import { Field, ID, ObjectType } from "type-graphql";
import { GraphQLJSONObject } from "graphql-type-json";
import AccountType from "../enums/AccountType";
import { Notification } from "./Notification";

@ObjectType("User", { description: "A registered Classi user profile" })
export class User {
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
}
