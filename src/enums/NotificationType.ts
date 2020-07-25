import {registerEnumType} from "type-graphql";

enum NotificationType {
    New_Follower = "NEW_FOLLOWER",
    New_Class_Comment = "NEW_CLASS_COMMENT",
    New_Post_Comment = "NEW_POST_COMMENT",
    New_Class_Like = "NEW_CLASS_LIKE",
    New_Post_Like = "NEW_POST_LIKE",
    New_Class_Registration = "NEW_CLASS_REGISTRATION"
}

export default NotificationType;

registerEnumType(NotificationType, {name: "NotificationType"});