"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var AccountType;
(function (AccountType) {
    AccountType["Trial"] = "TRIAL";
    AccountType["Free"] = "FREE";
    AccountType["Premium"] = "PREMIUM";
    AccountType["Admin"] = "ADMIN";
})(AccountType || (AccountType = {}));
exports.default = AccountType;
type_graphql_1.registerEnumType(AccountType, { name: "AccountType" });
//# sourceMappingURL=AccountType.js.map