import { Controller, Post, Get, Body, Param } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('/user/:userId')
  async findPostsByUser(
    @Param('userId') userId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findPostsByUserId(userId);
  }
}
