import {Field, ID, ObjectType} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";

@ObjectType("Comment")
export class Comment {
    @Field(() => ID)
    commentId!: string;
    @Field()
    createdBy: string;
    @Field({nullable: true})
    users3url: string;
    @Field()
    message: string;
    @Field()
    createdAt: number;
    @Field({nullable: true})
    parentCommentId: string;
    @Field(_type => GraphQLJSONObject, {nullable: true})
    likes: string[];
}