import {InputType, Field, ID} from "type-graphql";
import {Post} from "../../entities/Post";
import PostType from "../../enums/PostType";

@InputType()
export class PostInput implements Partial<Post> {
    @Field({nullable: true})
    createdBy: string
    @Field({nullable: true})
    users3url: string;
    @Field({nullable: true})
    caption: string;
    @Field(type => PostType, {nullable: true})
    postType: PostType;
    @Field({nullable: true})
    classId: string;
}
