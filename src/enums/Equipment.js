"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var Equipment;
(function (Equipment) {
    Equipment["None"] = "NONE";
    Equipment["Some"] = "SOME";
})(Equipment || (Equipment = {}));
exports.default = Equipment;
type_graphql_1.registerEnumType(Equipment, { name: "Equipment" });
//# sourceMappingURL=Equipment.js.map