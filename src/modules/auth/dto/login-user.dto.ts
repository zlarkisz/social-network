import { IsString, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
