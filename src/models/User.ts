import AccountType from '../enums/AccountType';
import Class from './Class';

export default class User {
    firstName: string;
    lastName: string;
    userName: string;
    biography: string;
    accountType: AccountType;
    creationDate: Date;
    classHistory: Class[];
    upcomingClasses: Class[];
    followers: User[];
    following: User[];

    getFirstName(): string {
        return this.firstName;
    }

    followUser(user: User) {
        this.following.push(user);
        // Update DB
    }

    editProfile(newUserName?: string, newBio?: string) {
        this.userName = newUserName ?? this.userName;
        this.biography = newBio ?? this.biography;
        // Update DB
    }

    changeAccountType(newAccountType?: AccountType) {
        this.accountType = newAccountType ?? this.accountType;
        // Update DB
    }
}