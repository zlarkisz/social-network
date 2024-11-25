import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/:userId')
  async findPostsByUser(
    @Param('userId') userId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findPostsByUserId(userId);
  }
}
