import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 30)
  title: string;

  @IsString()
  @Length(6, 30)
  content: string;
}
