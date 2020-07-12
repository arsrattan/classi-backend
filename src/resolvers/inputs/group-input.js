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
exports.CreateGroupInput = exports.UpdateGroupInput = void 0;
const type_graphql_1 = require("type-graphql");
const Registration_1 = __importDefault(require("../../entities/Registration"));
const graphql_type_json_1 = require("graphql-type-json");
let UpdateGroupInput = class UpdateGroupInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateGroupInput.prototype, "groupId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateGroupInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Array)
], UpdateGroupInput.prototype, "members", void 0);
__decorate([
    type_graphql_1.Field(_type => graphql_type_json_1.GraphQLJSONObject, { nullable: true }),
    __metadata("design:type", Array)
], UpdateGroupInput.prototype, "savedClasses", void 0);
__decorate([
    type_graphql_1.Field(type => Registration_1.default, { nullable: true }),
    __metadata("design:type", Array)
], UpdateGroupInput.prototype, "scheduledClasses", void 0);
UpdateGroupInput = __decorate([
    type_graphql_1.InputType()
], UpdateGroupInput);
exports.UpdateGroupInput = UpdateGroupInput;
let CreateGroupInput = class CreateGroupInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGroupInput.prototype, "groupId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateGroupInput.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], CreateGroupInput.prototype, "members", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Array)
], CreateGroupInput.prototype, "savedClasses", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Array)
], CreateGroupInput.prototype, "scheduledClasses", void 0);
CreateGroupInput = __decorate([
    type_graphql_1.InputType()
], CreateGroupInput);
exports.CreateGroupInput = CreateGroupInput;
//# sourceMappingURL=group-input.js.map