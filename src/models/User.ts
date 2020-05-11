import AccountType from "../../enums/AccountType";
import Class from './Class';

export default class User {
    firstName: string;
    lastName: string;
    userId: string;
    password: string;
    email: string;
    biography: string;
    accountType: AccountType;
    creationDate: Date;
    classHistory: Class[];
    upcomingClasses: Class[];
    followers: User[];
    following: User[];
    verifiedStatus: boolean;

    constructor(userId: string) {
        this.userId = userId;
    }

    getFirstName(): string {
        return this.firstName;
    }

    followUser(user: User) {
        this.following.push(user);
        // todo update DB
    }

    editProfile(newUserName?: string, newBio?: string) {
        this.userId = newUserName ?? this.userId;
        this.biography = newBio ?? this.biography;
        // todo update DB
    }

    changeAccountType(newAccountType?: AccountType) {
        this.accountType = newAccountType ?? this.accountType;
        // todo update DB
    }

    // Check if a user is following another user
    isFollowing(checkUser: User): boolean {
        let isFollowingUser:boolean = false;

        for (let userFollowing of this.following) {
            if (checkUser.userId == userFollowing.userId) {
                isFollowingUser = true;
            }
        }
        return isFollowingUser;
    }

    isVerified(): boolean {
        return this.verifiedStatus;
    }
}