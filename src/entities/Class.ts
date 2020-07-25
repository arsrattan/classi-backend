import { Field, ID, ObjectType } from "type-graphql";
import ClassType from "../enums/ClassType";
import Equipment from "../enums/Equipment";
import Difficulty from "../enums/Difficulty";
import { GraphQLJSONObject } from "graphql-type-json";
import { Comment } from "./Comment";
import Duration from "../enums/Duration";

@ObjectType("Class")
export class Class {
  @Field((type) => ID)
  classId!: string;
  @Field()
  className: string;
  @Field({ nullable: true })
  imageKey: string;
  @Field()
  classType: string;
  @Field()
  instructorUserId: string;
  @Field({ nullable: true })
  channel_thumbnail_url: string;
  @Field({ nullable: true })
  class_image_url: string;
  @Field({ nullable: true })
  description: string;
  @Field((type) => Equipment, { nullable: true })
  requiredEquipment: Equipment;
  @Field({ nullable: true })
  difficulty: string;
  @Field({ nullable: true })
  playlist_id: string;
  @Field({ nullable: true })
  view_count: string;
  @Field()
  expectedDuration: string;
  @Field()
  isPrivate: boolean;
  @Field()
  scheduledTime: number;
  @Field()
  createdAt: number;
  @Field((_type) => GraphQLJSONObject, { nullable: true })
  comments: Comment[];
  @Field((_type) => GraphQLJSONObject, { nullable: true })
  likes: any; //set of userids
}
