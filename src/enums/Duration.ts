import {registerEnumType} from "type-graphql";

enum Duration {
    MIN15 = 15,
    MIN30 = 30,
    MIN45 = 45,
    MIN60 = 60,
}

export default Duration;

registerEnumType(Duration, {name: "Duration"});
