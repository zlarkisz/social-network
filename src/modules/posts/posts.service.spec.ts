import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Post } from './post.entity';
import { PostsService } from './posts.service';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

const createTestingModule = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    providers: [
      PostsService,
      {
        provide: getRepositoryToken(Post),
        useClass: Repository,
      },
      {
        provide: UsersService,
        useValue: {
          findOne: jest.fn(),
        },
      },
    ],
  }).compile();
};

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'password',
  token: 'token',
  posts: [],
};

const mockPost = {
  id: 1,
  content: 'Test content',
  title: 'Test title',
  user: mockUser,
};

describe('PostsService', () => {
  let service: PostsService;
  let repository: Repository<Post>;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post));
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const post: CreatePostDto = {
        userId: 1,
        content: 'Test content',
        title: 'Test title',
      };
      const savedPost = { id: 1, ...post, user: mockUser };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(mockUser);
      jest.spyOn(repository, 'create').mockReturnValue(savedPost);
      jest.spyOn(repository, 'save').mockResolvedValue(savedPost);

      expect(await service.create(post)).toEqual(savedPost);
    });

    it('should throw NotFoundException if user not found', async () => {
      const post: CreatePostDto = {
        userId: 1,
        content: 'Test content',
        title: 'Test title',
      };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(service.create(post)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all posts', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([mockPost]);

      expect(await service.findAll()).toEqual([mockPost]);
    });
  });

  describe('findPostsByUserId', () => {
    it('should return posts for a given user ID', async () => {
      const userId = 1;
      const posts = [
        {
          id: 1,
          content: 'Test content',
          title: 'Test title',
          user: mockUser,
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(posts);

      expect(await service.findPostsByUserId(userId)).toEqual(posts);
    });

    it('should throw NotFoundException if no posts found for user ID', async () => {
      const userId = 1;

      jest.spyOn(repository, 'find').mockResolvedValue([]);

      await expect(service.findPostsByUserId(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
