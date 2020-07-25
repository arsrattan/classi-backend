import {registerEnumType} from "type-graphql";
import AccountType from "./AccountType";

enum ClassType {
    Strength = "STRENGTH",  
    Cardio = "CARDIO",
    Yoga = "YOGA",
    Cooking = "COOKING"
}

export default ClassType;

registerEnumType(ClassType, {name: "ClassType"});