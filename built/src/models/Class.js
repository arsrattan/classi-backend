"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var AWS_1 = __importDefault(require("../lib/AWS"));
var Class = (function () {
    function Class(body) {
    }
    Class.prototype.updatePrivacy = function (newPrivacy) {
        this.privacy = newPrivacy;
        var dydbParams = {};
        Class.documentClient.update(dydbParams);
    };
    Class.documentClient = AWS_1["default"]("Class");
    return Class;
}());
exports["default"] = Class;
//# sourceMappingURL=Class.js.map