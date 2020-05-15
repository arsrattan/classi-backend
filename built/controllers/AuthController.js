"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.AuthController = void 0;
var passport_1 = __importDefault(require("passport"));
var AuthController = (function () {
    function AuthController() {
    }
    AuthController.prototype.authenticateJWT = function (req, res, next) {
        passport_1["default"].authenticate("jwt", function (err, user, info) {
            if (err) {
                console.log(err);
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            if (!user) {
                return res.status(401).json({ status: "error", code: "unauthorized" });
            }
            else {
                return next();
            }
        })(req, res, next);
    };
    return AuthController;
}());
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map