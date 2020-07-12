"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["Easy"] = 1] = "Easy";
    Difficulty[Difficulty["Medium"] = 2] = "Medium";
    Difficulty[Difficulty["Hard"] = 3] = "Hard";
})(Difficulty || (Difficulty = {}));
exports.default = Difficulty;
type_graphql_1.registerEnumType(Difficulty, { name: "Difficulty" });
//# sourceMappingURL=Difficulty.js.map