import { InputType, Field } from "type-graphql";
import { User } from "../../entities/User";
import { IsEmail } from "class-validator";
import AccountType from "../../enums/AccountType";
import { GraphQLJSONObject } from "graphql-type-json";
import { Class } from "../../entities/Class";

@InputType()
export class UserInput implements Partial<User> {
<<<<<<< Updated upstream
  @Field()
  userId: string;
  @Field({ nullable: true })
  @IsEmail()
  email: string;
  @Field({ nullable: true })
  firstName: string;
  @Field({ nullable: true })
  lastName: string;
  @Field({ nullable: true })
  password: string;
  @Field({ nullable: true })
  biography: string;
  @Field((type) => AccountType, { nullable: true })
  accountType: AccountType;
  @Field({ nullable: true })
  s3url: string;
=======
    @Field()
    userId: string;
    @Field({ nullable: true })
    @IsEmail()
    email: string;
    @Field({ nullable: true })
    firstName: string;
    @Field({ nullable: true })
    lastName: string;
    @Field({ nullable: true })
    password: string;
    @Field({ nullable: true })
    biography: string;
    @Field(type => AccountType, { nullable: true })
    accountType: AccountType;
    @Field({nullable: true})
    s3url: string;
    @Field(_type => GraphQLJSONObject, {nullable: true})
    userGroups: [string];
>>>>>>> Stashed changes
}

@InputType()
export class CreateUserInput implements Partial<User> {
<<<<<<< Updated upstream
  @Field()
  username: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  dateOfBirth: string;
  @Field({ nullable: true })
  s3url: string;
}
=======
    @Field()
    userId: string;
    @Field({nullable: true})
    @IsEmail()
    email: string;
    @Field({nullable: true})
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
    @Field({nullable: true})
    s3url: string;
    @Field(_type => GraphQLJSONObject, {nullable: true})
    userGroups: [string];
    @Field({nullable: true})
    fbOrIgLogin: boolean;
}
>>>>>>> Stashed changes
