import { IsInt, IsString, Max, Min } from "class-validator";

export class SkillModel {
  @IsString()
  name: string;
  @IsInt()
  @Min(1)
  @Max(5)
  level: number;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
