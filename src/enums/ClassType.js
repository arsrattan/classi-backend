"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var ClassType;
(function (ClassType) {
    ClassType["Strength"] = "STRENGTH";
    ClassType["Cardio"] = "CARDIO";
    ClassType["Yoga"] = "YOGA";
    ClassType["Cooking"] = "COOKING";
})(ClassType || (ClassType = {}));
exports.default = ClassType;
type_graphql_1.registerEnumType(ClassType, { name: "ClassType" });
//# sourceMappingURL=ClassType.js.map