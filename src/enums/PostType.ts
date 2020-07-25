import {registerEnumType} from "type-graphql";
import AccountType from "./AccountType";

enum PostType {
    Completed_Class = "COMPLETED_CLASS",
    Registered_Class = "REGISTERED_FOR_CLASS",
    Created_Class = "CREATED_CLASS"
}

export default PostType;

registerEnumType(PostType, {name: "PostType"});