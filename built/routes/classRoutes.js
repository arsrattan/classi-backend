"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ClassRoutes = void 0;
var express_1 = require("express");
var ClassController_1 = __importDefault(require("../controllers/ClassController"));
var AuthController_1 = require("../controllers/AuthController");
var ClassRoutes = (function () {
    function ClassRoutes() {
        this.classController = new ClassController_1["default"]();
        this.authController = new AuthController_1.AuthController();
        this.router = express_1.Router();
        this.routes();
    }
    ClassRoutes.prototype.routes = function () {
        this.router.get("/", this.classController.listAllClasses);
        this.router.get("/:classId", this.classController.getClassById);
        this.router.post("/", this.authController.authenticateJWT, this.classController.createClass);
        this.router.put("/:classId", this.authController.authenticateJWT, this.classController.updateClass);
        this.router["delete"]("/:classId", this.authController.authenticateJWT, this.classController.deleteClass);
    };
    return ClassRoutes;
}());
exports.ClassRoutes = ClassRoutes;
//# sourceMappingURL=classRoutes.js.map