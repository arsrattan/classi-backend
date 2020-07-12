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
exports.GroupResolver = void 0;
const type_graphql_1 = require("type-graphql");
const Group_1 = __importDefault(require("../entities/Group"));
const isAuth_1 = require("../auth/isAuth");
const GroupController_1 = __importDefault(require("../controllers/GroupController"));
const group_input_1 = require("./inputs/group-input");
let GroupResolver = class GroupResolver {
    constructor() {
        this.groupController = new GroupController_1.default();
    }
    async getGroupById(groupId) {
        return await this.groupController.getWorkoutGroupById(groupId);
    }
    ;
    async createGroup(data) {
        return await this.groupController.createGroup(data);
    }
    ;
    async updateGroupById(data, groupId) {
        return await this.groupController.updateGroupById(groupId, data);
    }
    ;
    async deleteGroupById(groupId, userId) {
        return await this.groupController.deleteGroupById(groupId, userId);
    }
    ;
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Group_1.default], { nullable: true }),
    __param(0, type_graphql_1.Arg("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "getGroupById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_input_1.CreateGroupInput]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "createGroup", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __param(1, type_graphql_1.Arg("groupId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [group_input_1.UpdateGroupInput, String]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "updateGroupById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("groupId")),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GroupResolver.prototype, "deleteGroupById", null);
GroupResolver = __decorate([
    type_graphql_1.Resolver()
], GroupResolver);
exports.GroupResolver = GroupResolver;
//# sourceMappingURL=GroupResolver.js.map