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
exports.CreateClassInput = exports.UpdateClassInput = void 0;
const type_graphql_1 = require("type-graphql");
const Equipment_1 = __importDefault(require("../../enums/Equipment"));
let UpdateClassInput = class UpdateClassInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "instructorUserId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "className", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "classType", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "channel_thumbnail_url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "class_image_url", void 0);
__decorate([
    type_graphql_1.Field(type => Equipment_1.default, { nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "requiredEquipment", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "difficulty", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateClassInput.prototype, "expectedDuration", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateClassInput.prototype, "isPrivate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], UpdateClassInput.prototype, "scheduledTime", void 0);
UpdateClassInput = __decorate([
    type_graphql_1.InputType()
], UpdateClassInput);
exports.UpdateClassInput = UpdateClassInput;
let CreateClassInput = class CreateClassInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateClassInput.prototype, "className", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateClassInput.prototype, "classType", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateClassInput.prototype, "instructorUserId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateClassInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateClassInput.prototype, "channel_thumbnail_url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateClassInput.prototype, "class_image_url", void 0);
__decorate([
    type_graphql_1.Field(type => Equipment_1.default),
    __metadata("design:type", String)
], CreateClassInput.prototype, "requiredEquipment", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateClassInput.prototype, "difficulty", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], CreateClassInput.prototype, "expectedDuration", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Boolean)
], CreateClassInput.prototype, "isPrivate", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], CreateClassInput.prototype, "scheduledTime", void 0);
CreateClassInput = __decorate([
    type_graphql_1.InputType()
], CreateClassInput);
exports.CreateClassInput = CreateClassInput;
//# sourceMappingURL=class-input.js.map