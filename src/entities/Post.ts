import {Field, ID, ObjectType} from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json'
import {User} from "./User";
import PostType from "../enums/PostType";
import {Comment} from "./Comment";

@ObjectType("Post")
export class Post {

    @Field(() => ID)
    postId!: string;
    @Field()
    createdBy: string;
    @Field({nullable: true})
    caption: string;
    @Field(_type => GraphQLJSONObject)
    comments: Comment[];
    @Field(type => PostType)
    postType: PostType;
    @Field()
    createdAt: number;
    @Field(_type => [String])
    likes: string[]; //list of userids
}