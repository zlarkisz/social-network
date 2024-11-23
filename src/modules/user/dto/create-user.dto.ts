import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 30)
  password: string;
}
