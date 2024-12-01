import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { IPost } from './post.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(post: IPost): Promise<Post> {
    const user = await this.usersService.findOne(post.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const newPost = this.postsRepository.create({
      ...post,
      user,
    });

    return this.postsRepository.save(newPost);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find();
  }

  async findPostsByUserId(userId: number): Promise<Post[]> {
    const posts = await this.postsRepository.find({
      where: { user: { id: userId } },
    });

    if (!posts.length) {
      throw new NotFoundException(`Posts for user with ID ${userId} not found`);
    }

    return posts;
  }
}
