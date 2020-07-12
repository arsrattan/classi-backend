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
exports.ClassResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Class_1 = require("../entities/Class");
const ClassController_1 = __importDefault(require("../controllers/ClassController"));
const class_input_1 = require("./inputs/class-input");
const isAuth_1 = require("../auth/isAuth");
const comment_input_1 = require("./inputs/comment-input");
let ClassResolver = class ClassResolver {
    constructor() {
        this.classController = new ClassController_1.default();
    }
    async getClassById(classId) {
        return await this.classController.getClassById(classId);
    }
    ;
    async getAllClasses() {
        return await this.classController.getAllClasses();
    }
    ;
    async createClass(data) {
        return await this.classController.createClass(data);
    }
    ;
    async addCommentToClass(data, classCreator, classId, userId) {
        return await this.classController.addCommentToClass(userId, classCreator, classId, data);
    }
    ;
    async updateClassById(data, classId) {
        return await this.classController.updateClassById(classId, data);
    }
    ;
    async likeClass(userId, classCreator, classId, isUnlike) {
        return await this.classController.likeClass(userId, classCreator, classId, isUnlike);
    }
    ;
    async registerForClass(userId, classId, scheduledTime) {
        return await this.classController.registerForClass(userId, classId, scheduledTime);
    }
    ;
    async deleteClassById(classId, userId) {
        return await this.classController.deleteClassById(classId, userId);
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Class_1.Class], { nullable: true }),
    __param(0, type_graphql_1.Arg("classId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getClassById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Class_1.Class], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "getAllClasses", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUserFromJson),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_input_1.CreateClassInput]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "createClass", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __param(1, type_graphql_1.Arg("classCreator")),
    __param(2, type_graphql_1.Arg("classId")),
    __param(3, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_input_1.CreateCommentInput, String, String, String]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "addCommentToClass", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUserFromJson),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __param(1, type_graphql_1.Arg("classId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [class_input_1.UpdateClassInput, String]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "updateClassById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __param(1, type_graphql_1.Arg("classCreator")),
    __param(2, type_graphql_1.Arg("classId")),
    __param(3, type_graphql_1.Arg("isUnlike")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "likeClass", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("userId")),
    __param(1, type_graphql_1.Arg("classId")),
    __param(2, type_graphql_1.Arg("scheduledTime")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "registerForClass", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("classId")),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassResolver.prototype, "deleteClassById", null);
ClassResolver = __decorate([
    type_graphql_1.Resolver()
], ClassResolver);
exports.ClassResolver = ClassResolver;
//# sourceMappingURL=ClassResolver.js.map