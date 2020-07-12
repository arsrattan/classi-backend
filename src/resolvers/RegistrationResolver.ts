import {Arg, Mutation, Query, Resolver, UseMiddleware} from "type-graphql";
import {RegistrationInput} from "./inputs/registration-input";
import RegistrationController from "../controllers/RegistrationController";
import Registration from "../entities/Registration";
import {isAuth, isCorrectUser} from "../auth/isAuth";

@Resolver()
export class RegistrationResolver {

    public registrationController: RegistrationController = new RegistrationController();

    @UseMiddleware(isAuth)
    @Query(() => [Registration], { nullable: true })
    async getRegistrationById(@Arg("registrationId") registrationId: string){
        return await this.registrationController.getRegistrationById(registrationId);
    };

    @UseMiddleware(isAuth)
    @Mutation(() => Boolean)
    async createRegistration(@Arg("data") data: RegistrationInput) {
        return await this.registrationController.createRegistration(data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async updateRegistrationById(@Arg("data", {nullable: true}) data: RegistrationInput,
                         @Arg("registrationId") registrationId: string,
                         @Arg("userId") userId: string) {
        return await this.registrationController.updateRegistrationById(registrationId, data);
    };

    @UseMiddleware(isCorrectUser)
    @Mutation(() => Boolean)
    async deleteRegistration(@Arg("registrationId") registrationId: string,
                     @Arg("userId") userId: string) {
        return await this.registrationController.deleteRegistration(registrationId);
    }

}