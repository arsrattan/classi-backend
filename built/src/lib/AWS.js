"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var config_1 = __importDefault(require("config"));
function createDocumentClient(model) {
    aws_sdk_1["default"].config.update({
        region: config_1["default"].get(model + ".AWS.region")
    });
    var documentClient = new aws_sdk_1["default"].DynamoDB.DocumentClient({
        apiVersion: config_1["default"].get(model + ".AWS.apiVersion")
    });
    return documentClient;
}
exports["default"] = createDocumentClient;
//# sourceMappingURL=AWS.js.map