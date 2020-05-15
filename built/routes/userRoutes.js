"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.UserRoutes = void 0;
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var UserRoutes = (function () {
    function UserRoutes() {
        this.userController = new UserController_1["default"]();
        this.router = express_1.Router();
        this.routes();
    }
    UserRoutes.prototype.routes = function () {
        this.router.get("/", this.userController.listAllUsers);
        this.router.get("/:userId", this.userController.getUserById);
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
    };
    return UserRoutes;
}());
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=userRoutes.js.map