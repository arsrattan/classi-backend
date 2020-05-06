import User from "./User";
import ClassType from '../enums/ClassType';
import Equipment from '../enums/Equipment';
import Privacy from '../enums/Privacy';

export default class Class {
    name: string;
    instructor: User;
    description: string;
    workoutType: ClassType;
    requiredEquipment: Equipment;
    difficulty: Difficulty;
    expectedDuration: string;
    privacy: Privacy;
    scheduledTime: Date;
}