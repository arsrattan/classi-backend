import { InputType, Field } from "type-graphql";
import {Class} from "../entities/Classes";

@InputType()
export class ClassInput implements Partial<Class> {
    @Field()
    className: string;
    @Field()
    classType: string;
    //add more here, this is just a POC
}
