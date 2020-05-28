import {registerEnumType} from "type-graphql";

enum AccountType {
    Trial = "TRIAL",
    Free = "FREE",
    Premium = "PREMIUM",
    Admin = "ADMIN"
}

export default AccountType;

registerEnumType(AccountType, {name: "AccountType"});