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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const type_graphql_1 = require("type-graphql");
const graphql_type_json_1 = require("graphql-type-json");
const AccountType_1 = __importDefault(require("../enums/AccountType"));
let User = class User {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], User.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "imageKey", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "s3url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "biography", void 0);
__decorate([
    type_graphql_1.Field(type => AccountType_1.default),
    __metadata("design:type", String)
], User.prototype, "accountType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject),
    __metadata("design:type", Array)
], User.prototype, "notifications", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], User.prototype, "confirmed", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Array)
], User.prototype, "userGroups", void 0);
User = __decorate([
    type_graphql_1.ObjectType("User")
], User);
exports.User = User;
//# sourceMappingURL=User.js.map