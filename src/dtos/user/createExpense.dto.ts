import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(6, 25)
  password: string;

  @IsString()
  @Length(5, 25)
  firstName: string;

  @IsString()
  @Length(3, 25)
  lastName: string;

  @IsString()
  @Length(10, 10)
  phone: string;

  @IsEmail()
  email: string;
}
