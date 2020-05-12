import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {PostInput} from "./inputs/post-input";
import PostController from "../controllers/PostController";
import {Post} from "../entities/Post";


@Resolver()
export class PostResolver {

    public postController: PostController = new PostController();

    @Query(() => [Post], { nullable: true })
    async getPostById(@Arg("postId") postId: string){
        return await this.postController.getPostById(postId);
    };

    @Query(() => [Post], { nullable: true })
    async getAllPostsForUser(@Arg("userId") userId: string){
        return await this.postController.getAllPostsForUser(userId);
    };

    @Mutation(() => Boolean)
    async createPost(@Arg("data") data: PostInput) {
        return await this.postController.createPost(data);
    };

    @Mutation(() => Boolean)
    async updatePostById(@Arg("data") data: PostInput,
                          @Arg("postId") postId: string) {
        return await this.postController.updatePostById(data, postId);
    };

    @Mutation(() => Boolean)
    async deletePost(@Arg("postId") postId: string) {
        return await this.postController.deletePost(postId);
    }

}