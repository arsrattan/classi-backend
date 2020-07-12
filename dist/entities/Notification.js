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
exports.Notification = void 0;
const type_graphql_1 = require("type-graphql");
const NotificationType_1 = __importDefault(require("../enums/NotificationType"));
let Notification = class Notification {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Notification.prototype, "notificationId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Notification.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Number)
], Notification.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "triggeringUserId", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "triggeringUserS3Url", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], Notification.prototype, "triggeringClassId", void 0);
__decorate([
    type_graphql_1.Field(type => NotificationType_1.default),
    __metadata("design:type", String)
], Notification.prototype, "notificationType", void 0);
Notification = __decorate([
    type_graphql_1.ObjectType("Notification")
], Notification);
exports.Notification = Notification;
//# sourceMappingURL=Notification.js.map