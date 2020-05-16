import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {PostInput} from "./inputs/post-input";
import PostController from "../controllers/PostController";
import {Post} from "../entities/Post";
import {isAuth, isCorrectUser, isCorrectUserFromJson} from "../auth/isAuth";


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
    async createPost(@Arg("data") data: PostInput) {
        return await this.postController.createPost(data);
    };

    @UseMiddleware(isCorrectUserFromJson)
    @Mutation(() => Boolean)
    async updatePostById(@Arg("data") data: PostInput,
                          @Arg("postId") postId: string) {
        return await this.postController.updatePostById(data, postId);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deletePost(@Arg("postId") postId: string,
                     @Arg("userId") userId: string) {
        return await this.postController.deletePost(postId);
    }

}