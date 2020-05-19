import {Field, InputType} from "type-graphql";
import {Comment} from "../../entities/Comment";
import {User} from "../../entities/User";

@InputType()
export class CreateCommentInput implements Partial<Comment> {
    @Field()
    createdBy: User;
    @Field()
    message: string;
    @Field({nullable: true})
    parentComment: Comment;
}
