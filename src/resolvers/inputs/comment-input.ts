import {Field, InputType} from "type-graphql";
import {Comment} from "../../entities/Comment";
import {GraphQLJSONObject} from "graphql-type-json";

@InputType()
export class CreateCommentInput implements Partial<Comment> {
    @Field()
    createdBy: string;
    @Field()
    message: string;
    @Field({nullable: true})
    parentCommentId: string;
    @Field({nullable: true})
    users3url: string;
}
