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
exports.Class = void 0;
const type_graphql_1 = require("type-graphql");
const Equipment_1 = __importDefault(require("../enums/Equipment"));
const graphql_type_json_1 = require("graphql-type-json");
let Class = class Class {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Class.prototype, "classId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Class.prototype, "className", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "imageKey", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Class.prototype, "classType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Class.prototype, "instructorUserId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "channel_thumbnail_url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "class_image_url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(type => Equipment_1.default, { nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "requiredEquipment", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "difficulty", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "playlist_id", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Class.prototype, "view_count", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Class.prototype, "expectedDuration", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], Class.prototype, "isPrivate", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Class.prototype, "scheduledTime", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Class.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Array)
], Class.prototype, "comments", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Object)
], Class.prototype, "likes", void 0);
Class = __decorate([
    type_graphql_1.ObjectType("Class")
], Class);
exports.Class = Class;
//# sourceMappingURL=Class.js.map