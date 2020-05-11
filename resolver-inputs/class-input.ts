import { InputType, Field } from "type-graphql";
import {Class} from "../entities/Classes";

@InputType()
export class ClassInput implements Partial<Class> {
    @Field({ nullable: true })
    className: string;
    @Field({ nullable: true })
    classType: string;
    //add more here, this is just a POC
}
