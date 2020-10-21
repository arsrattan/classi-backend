import {Field, ObjectType} from "type-graphql";

@ObjectType("AuthData")
export class AuthData {
    @Field()
    accessToken: string;
    @Field()
    username: string;
    @Field()
    expirationInHours: number;
}