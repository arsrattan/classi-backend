import {registerEnumType} from "type-graphql";
import AccountType from "./AccountType";

enum Difficulty {
    Easy = 1,
    Medium = 2,
    Hard = 3
}

export default Difficulty;

registerEnumType(Difficulty, {name: "Difficulty"});