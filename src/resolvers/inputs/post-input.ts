import {InputType, Field, ID} from "type-graphql";
import {Post} from "../../entities/Post";
import PostType from "../../enums/PostType";

@InputType()
export class PostInput implements Partial<Post> {
    @Field()
    createdBy: string
    @Field({nullable: true})
    caption: string;
    @Field(type => PostType)
    postType: PostType;
    @Field({nullable: true})
    classId: string;
}
