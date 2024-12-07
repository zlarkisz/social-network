import { ApiProperty } from '@nestjs/swagger';

import { IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of the post',
    example: 'My First Post',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @Length(3, 30)
  title: string;

  @ApiProperty({
    description: 'The content of the post',
    example: 'This is the content of my first post.',
    minLength: 6,
    maxLength: 500,
  })
  @IsString()
  @Length(6, 500)
  content: string;

  @ApiProperty({
    description: 'The ID of the user creating the post',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
