import {Field, ID, ObjectType} from "type-graphql";
import {User} from "./User";

@ObjectType({ description: "The Comment model" })
export class Comment {
    @Field(() => ID)
    commentId!: string;
    @Field()
    createdBy: User;
    @Field()
    message: string;
    @Field()
    creationDate: Date;
    @Field()
    likes: string[]; //list of userids
}