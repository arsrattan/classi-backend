"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResolver = void 0;
const type_graphql_1 = require("type-graphql");
const post_input_1 = require("./inputs/post-input");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const Post_1 = require("../entities/Post");
const isAuth_1 = require("../auth/isAuth");
const comment_input_1 = require("./inputs/comment-input");
let PostResolver = class PostResolver {
    constructor() {
        this.postController = new PostController_1.default();
    }
    async getPostById(postId) {
        return await this.postController.getPostById(postId);
    }
    ;
    async getAllPostsForUser(userId) {
        return await this.postController.getAllPostsForUser(userId);
    }
    ;
    async createPost(data) {
        return await this.postController.createPost(data);
    }
    ;
    async updatePostById(data, postId, userId) {
        return await this.postController.updatePostById(postId, data);
    }
    ;
    async addCommentToPost(data, postId, postCreator, userId) {
        return await this.postController.addCommentToPost(userId, postCreator, postId, data);
    }
    ;
    async likePost(postId, userId, postCreator, isUnlike) {
        return await this.postController.likePost(userId, postCreator, postId, isUnlike);
    }
    ;
    async deletePost(postId, userId) {
        return await this.postController.deletePost(postId);
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __param(0, type_graphql_1.Arg("postId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getPostById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Post_1.Post], { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "getAllPostsForUser", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_input_1.PostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __param(1, type_graphql_1.Arg("postId")),
    __param(2, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_input_1.PostInput, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePostById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Arg("postId")),
    __param(2, type_graphql_1.Arg("postCreator")),
    __param(3, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_input_1.CreateCommentInput, String, String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addCommentToPost", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("postId")),
    __param(1, type_graphql_1.Arg("userId")),
    __param(2, type_graphql_1.Arg("postCreator")),
    __param(3, type_graphql_1.Arg("isUnlike")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "likePost", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("postId")),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    type_graphql_1.Resolver()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=PostResolver.js.map