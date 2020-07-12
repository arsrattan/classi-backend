"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
var NotificationType;
(function (NotificationType) {
    NotificationType["New_Follower"] = "NEW_FOLLOWER";
    NotificationType["New_Class_Comment"] = "NEW_CLASS_COMMENT";
    NotificationType["New_Post_Comment"] = "NEW_POST_COMMENT";
    NotificationType["New_Class_Like"] = "NEW_CLASS_LIKE";
    NotificationType["New_Post_Like"] = "NEW_POST_LIKE";
    NotificationType["New_Class_Registration"] = "NEW_CLASS_REGISTRATION";
})(NotificationType || (NotificationType = {}));
exports.default = NotificationType;
type_graphql_1.registerEnumType(NotificationType, { name: "NotificationType" });
//# sourceMappingURL=NotificationType.js.map