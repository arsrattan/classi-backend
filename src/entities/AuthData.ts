import {Field, ObjectType} from "type-graphql";

@ObjectType("AuthData")
export class AuthData {
    @Field()
    accessToken: string;
    @Field()
    userId: string;
    @Field()
    expirationInHours: number;
}