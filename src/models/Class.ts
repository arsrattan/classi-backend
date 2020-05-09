import User from "./User";
import ClassType from "../../enums/ClassType";
import Equipment from "../../enums/Equipment";
import Privacy from "../../enums/Privacy";
import Difficulty from "../../enums/Difficulty";
import createDocumentClient from "../lib/AWS";

export default class Class {

  classId: string;
  name: string;
  instructor: User;
  description: string;
  workoutType: ClassType;
  requiredEquipment: Equipment;
  difficulty: Difficulty;
  expectedDuration: string;
  privacy: Privacy;
  scheduledTime: Date;

  constructor(body?: any) {

  }

  static documentClient = createDocumentClient("Class");

  updatePrivacy(newPrivacy: Privacy) {
    this.privacy = newPrivacy;
    const dydbParams = {};
    Class.documentClient.update((dydbParams as unknown) as any);
  }
}
