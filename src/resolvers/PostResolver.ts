import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {PostInput} from "./inputs/post-input";
import PostController from "../controllers/PostController";
import {Post} from "../entities/Post";
import {isAuth, isCorrectUser, isCorrectUserFromJson} from "../auth/isAuth";
import {GraphQLUpload} from "graphql-upload";
import {Upload} from "../lib/AWS";
import {CreateCommentInput} from "./inputs/comment-input";


@Resolver()
export class PostResolver {

    public postController: PostController = new PostController();

    @UseMiddleware(isAuth)
    @Query(() => [Post], { nullable: true })
    async getPostById(@Arg("postId") postId: string){
        return await this.postController.getPostById(postId);
    };

    @UseMiddleware(isAuth)
    @Query(() => [Post], { nullable: true })
    async getAllPostsForUser(@Arg("userId") userId: string){
        return await this.postController.getAllPostsForUser(userId);
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async createPost(@Arg("data") data: PostInput,
                     @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.postController.createPost(data);
    };

    @UseMiddleware(isCorrectUserFromJson)
    @Mutation(() => Boolean)
    async updatePostById(@Arg("data", {nullable: true}) data: PostInput,
                         @Arg("postId") postId: string,
                         @Arg("picture", () => GraphQLUpload, {nullable: true}) picture: Upload) {
        return await this.postController.updatePostById(postId, data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async addCommentToPost(@Arg("data") data: CreateCommentInput,
                           @Arg("postId") postId: string,
                           @Arg("postCreator") postCreator: string,
                           @Arg("userId") userId: string) {
        return await this.postController.addCommentToPost(userId, postCreator, postId, data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async likePost(@Arg("postId") postId: string,
                   @Arg("userId") userId: string,
                   @Arg("postCreator") postCreator: string,
                   @Arg("isUnlike") isUnlike: boolean) {
        return await this.postController.likePost(userId, postCreator, postId, isUnlike);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deletePost(@Arg("postId") postId: string,
                     @Arg("userId") userId: string) {
        return await this.postController.deletePost(postId);
    }

}