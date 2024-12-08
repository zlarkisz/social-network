import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './post.entity';
import { PostsService } from './posts.service';
import { Cache } from '../../decorators/cache.decorator';
import { ForbiddenGuard } from '../../guards/forbidden.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
@ApiTags('Posts')
@ApiBearerAuth('access-token')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(ForbiddenGuard)
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({
    status: 201,
    description: 'Post successfully created.',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @Cache({ ttl: 60 })
  @ApiOperation({ summary: 'Retrieve all posts' })
  @ApiResponse({
    status: 200,
    description: 'List of posts.',
    type: [PostEntity],
  })
  findAll(): Promise<PostEntity[]> {
    return this.postsService.findAll();
  }

  @Get('/user/:userId')
  @ApiOperation({ summary: 'Retrieve posts by user ID' })
  @ApiResponse({ status: 200, description: 'Posts found.', type: [PostEntity] })
  @ApiResponse({
    status: 404,
    description: 'User not found or no posts available.',
  })
  async findPostsByUser(
    @Param('userId') userId: number,
  ): Promise<PostEntity[]> {
    return this.postsService.findPostsByUserId(userId);
  }
}
