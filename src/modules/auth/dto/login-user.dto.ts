import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'johndoe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword123',
    minLength: 6,
    maxLength: 30,
  })
  @IsString()
  @Length(6, 30)
  password: string;
}
