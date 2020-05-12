import {Field, ID, ObjectType} from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json'
import {User} from "./User";
import PostType from "../enums/PostType";
import {Comment} from "./Comment";

@ObjectType({ description: "The Post model" })
export class Post {

    @Field(() => ID)
    postId!: string;
    @Field()
    createdBy: User;
    @Field({nullable: true})
    caption: string;
    @Field(_type => GraphQLJSONObject)
    comments: Comment[];
    @Field()
    postType: PostType;
    @Field()
    creationDate: Date;
    @Field()
    likes: string[]; //list of userids
}