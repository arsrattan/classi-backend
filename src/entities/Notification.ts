import {Field, ID, ObjectType} from "type-graphql";
import NotificationType from "../enums/NotificationType";

@ObjectType("Notification")
export class Notification {
    @Field(() => ID)
    notificationId!: string;
    @Field()
    userId: string;
    @Field()
    createdAt: number;
    @Field({nullable: true})
    triggeringUserId: string;
    @Field({nullable: true})
    triggeringClassId: string;
    @Field(type => NotificationType)
    notificationType: NotificationType
}