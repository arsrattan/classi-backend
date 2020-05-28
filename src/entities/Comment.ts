import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

@ObjectType("Comment")
export class Comment {
    @Field(() => ID)
    commentId!: string;
    @Field()
    createdBy: string;
    @Field()
    message: string;
    @Field()
    createdAt: number;
    @Field(_type => GraphQLJSONObject,{nullable: true})
    parentComment: Comment;
    @Field(_type => [String])
    likes: string[];
}