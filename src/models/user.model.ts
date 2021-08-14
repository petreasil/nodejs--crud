import { IsInt, IsString, MinLength } from "class-validator";

export class UserModel {
  @IsInt()
  id: number;

  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @MinLength(6)
  surname: string;

  constructor(obj) {
    Object.assign(this, obj);
  }
}
