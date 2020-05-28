import {registerEnumType} from "type-graphql";
import AccountType from "./AccountType";

enum Equipment {
    None = "NONE",
    Some = "SOME"
}

export default Equipment;

registerEnumType(Equipment, {name: "Equipment"});