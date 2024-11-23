import { IsString, Length, IsNumber, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 30)
  title: string;

  @IsString()
  @Length(6, 500)
  content: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
