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
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entities/User");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const user_input_1 = require("./inputs/user-input");
const AuthData_1 = require("../entities/AuthData");
const isAuth_1 = require("../auth/isAuth");
const Notification_1 = require("../entities/Notification");
let UserResolver = class UserResolver {
    constructor() {
        this.userController = new UserController_1.default();
    }
    async getUserById(userId) {
        return await this.userController.getUserById(userId);
    }
    ;
    async getAllUsers() {
        return await this.userController.getAllUsers();
    }
    ;
    async getUserFollowers(userId) {
        return await this.userController.getUserFollowers(userId);
    }
    ;
    async getUserFollowing(userId) {
        return await this.userController.getUserFollowing(userId);
    }
    ;
    async getUserNotifications(userId) {
        return await this.userController.getUserNotifications(userId);
    }
    ;
    async getNumFollowers(userId) {
        return await this.userController.getNumFollowers(userId);
    }
    ;
    async login(email, password) {
        return await this.userController.login(email, password);
    }
    ;
    async toggleFollow(userId, followedUser, isUnfollow) {
        return await this.userController.toggleFollow(userId, followedUser, isUnfollow);
    }
    ;
    async registerUser(data) {
        return await this.userController.registerUser(data);
    }
    ;
    async confirmUser(token) {
        return await this.userController.confirmUser(token);
    }
    ;
    async changePassword(token, password) {
        return await this.userController.changePassword(token, password);
    }
    ;
    async forgotPassword(email) {
        return await this.userController.forgotPassword(email);
    }
    ;
    async updateUser(data, userId) {
        return await this.userController.updateUser(userId, data);
    }
    ;
    async deleteUserById(userId) {
        return await this.userController.deleteUserById(userId);
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [User_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getAllUsers", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserFollowers", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [User_1.User], { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserFollowing", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Query(() => [Notification_1.Notification], { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserNotifications", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => Number, { nullable: true }),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getNumFollowers", null);
__decorate([
    type_graphql_1.Mutation(() => AuthData_1.AuthData),
    __param(0, type_graphql_1.Arg("email")),
    __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __param(1, type_graphql_1.Arg("followedUser")),
    __param(2, type_graphql_1.Arg("isUnfollow")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Boolean]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "toggleFollow", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "registerUser", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUserFromConfirmation),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("token")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmUser", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUserFromConfirmation),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUserById", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=UserResolver.js.map