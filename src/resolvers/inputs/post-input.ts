import {InputType, Field, ID} from "type-graphql";
import {GraphQLJSONObject} from "graphql-type-json";
import {Post} from "../../entities/Post";
import PostType from "../../enums/PostType";
import {Comment} from "../../entities/Comment";

@InputType()
export class PostInput implements Partial<Post> {
    @Field(() => ID)
    postId!: string;
    @Field({nullable: true})
    caption: string;
    @Field(_type => GraphQLJSONObject)
    commentToAdd: Comment;
    @Field(_type => GraphQLJSONObject)
    commentToDelete: Comment;
    @Field()
    postType: PostType;
}
