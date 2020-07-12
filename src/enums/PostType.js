"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var PostType;
(function (PostType) {
    PostType["Completed_Class"] = "COMPLETED_CLASS";
    PostType["Registered_Class"] = "REGISTERED_FOR_CLASS";
    PostType["Created_Class"] = "CREATED_CLASS";
})(PostType || (PostType = {}));
exports.default = PostType;
type_graphql_1.registerEnumType(PostType, { name: "PostType" });
//# sourceMappingURL=PostType.js.map