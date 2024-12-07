import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { ForbiddenGuard } from '../../guards/forbidden.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Posts')
@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created.',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @UseGuards(ForbiddenGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({ summary: 'Retrieve all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts.',
    type: [PostEntity],
  })
  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve posts by user ID' })
  @ApiResponse({ status: 200, description: 'Posts found.', type: [PostEntity] })
  @ApiResponse({
    status: 404,
    description: 'User not found or no posts available.',
  })
  @Get('/user/:userId')
  async findPostsByUser(
    @Param('userId') userId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findPostsByUserId(userId);
  }
}
