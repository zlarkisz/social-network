import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsEmail, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'The name or login of the user',
    example: 'JohnDoe',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @Length(3, 30)
  name: string;

  @ApiProperty({
    description: 'The email address of the user',
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
