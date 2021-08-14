import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";
import { SkillModel } from "./skill.model";

export class Manager {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(6)
  name: string;

  @IsArray()
  @ValidateNested()
  @IsOptional()
  skills: SkillModel[];
  constructor(obj) {
    Object.assign(this, obj);
    if (obj?.skills) {
      this.skills = obj.skills.map((skill) => new SkillModel(skill));
    }
  }
}
