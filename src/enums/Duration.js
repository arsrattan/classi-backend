"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var Duration;
(function (Duration) {
    Duration[Duration["MIN15"] = 15] = "MIN15";
    Duration[Duration["MIN30"] = 30] = "MIN30";
    Duration[Duration["MIN45"] = 45] = "MIN45";
    Duration[Duration["MIN60"] = 60] = "MIN60";
})(Duration || (Duration = {}));
exports.default = Duration;
type_graphql_1.registerEnumType(Duration, { name: "Duration" });
//# sourceMappingURL=Duration.js.map