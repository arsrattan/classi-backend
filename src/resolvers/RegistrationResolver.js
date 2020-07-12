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
exports.RegistrationResolver = void 0;
const type_graphql_1 = require("type-graphql");
const registration_input_1 = require("./inputs/registration-input");
const RegistrationController_1 = __importDefault(require("../controllers/RegistrationController"));
const Registration_1 = __importDefault(require("../entities/Registration"));
const isAuth_1 = require("../auth/isAuth");
let RegistrationResolver = class RegistrationResolver {
    constructor() {
        this.registrationController = new RegistrationController_1.default();
    }
    async getRegistrationById(registrationId) {
        return await this.registrationController.getRegistrationById(registrationId);
    }
    ;
    async createRegistration(data) {
        return await this.registrationController.createRegistration(data);
    }
    ;
    async updateRegistrationById(data, registrationId, userId) {
        return await this.registrationController.updateRegistrationById(registrationId, data);
    }
    ;
    async deleteRegistration(registrationId, userId) {
        return await this.registrationController.deleteRegistration(registrationId);
    }
};
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Query(() => [Registration_1.default], { nullable: true }),
    __param(0, type_graphql_1.Arg("registrationId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "getRegistrationById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_input_1.RegistrationInput]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "createRegistration", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("data", { nullable: true })),
    __param(1, type_graphql_1.Arg("registrationId")),
    __param(2, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registration_input_1.RegistrationInput, String, String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "updateRegistrationById", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isCorrectUser),
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg("registrationId")),
    __param(1, type_graphql_1.Arg("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], RegistrationResolver.prototype, "deleteRegistration", null);
RegistrationResolver = __decorate([
    type_graphql_1.Resolver()
], RegistrationResolver);
exports.RegistrationResolver = RegistrationResolver;
//# sourceMappingURL=RegistrationResolver.js.map