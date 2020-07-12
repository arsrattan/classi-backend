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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
let Group = class Group {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Group.prototype, "groupId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Group.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Array)
], Group.prototype, "members", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Array)
], Group.prototype, "savedClasses", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Array)
], Group.prototype, "scheduledClasses", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Array)
], Group.prototype, "pastClasses", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Group.prototype, "createdTime", void 0);
Group = __decorate([
    type_graphql_1.ObjectType("Group")
], Group);
exports.default = Group;
//# sourceMappingURL=Group.js.map