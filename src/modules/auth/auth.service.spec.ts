import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

const createTestingModule = async (): Promise<TestingModule> => {
  return await Test.createTestingModule({
    providers: [
      AuthService,
      {
        provide: UsersService,
        useValue: {
          findByEmail: jest.fn(),
          validatePassword: jest.fn(),
          updateToken: jest.fn(),
        },
      },
      {
        provide: JwtService,
        useValue: {
          sign: jest.fn(),
          verify: jest.fn(),
        },
      },
    ],
  }).compile();
};

const mockUser = {
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedPassword',
  token: 'existingToken',
  posts: [],
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await createTestingModule();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('logIn', () => {
    it('should return existing valid token', async () => {
      const loginUser = { email: 'test@example.com', password: 'password' };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'verify').mockReturnValue({ valid: true });

      expect(await service.logIn(loginUser)).toEqual({
        access_token: 'existingToken',
      });
    });

    it('should throw UnauthorizedException for invalid email', async () => {
      const loginUser = { email: 'test@example.com', password: 'password' };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(null);

      await expect(service.logIn(loginUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should throw UnauthorizedException for invalid password', async () => {
      const loginUser = { email: 'test@example.com', password: 'password' };
      const user = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        token: null,
        posts: [],
      };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(user);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(false);

      await expect(service.logIn(loginUser)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should return existing valid token', async () => {
      const loginUser = { email: 'test@example.com', password: 'password' };

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'verify').mockReturnValue({ valid: true });

      expect(await service.logIn(loginUser)).toEqual({
        access_token: 'existingToken',
      });
    });

    it('should create a new token if existing token is invalid', async () => {
      const loginUser = { email: 'test@example.com', password: 'password' };
      const newToken = 'newToken';

      jest.spyOn(usersService, 'findByEmail').mockResolvedValue(mockUser);
      jest.spyOn(usersService, 'validatePassword').mockResolvedValue(true);
      jest.spyOn(jwtService, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });
      jest.spyOn(jwtService, 'sign').mockReturnValue(newToken);
      jest.spyOn(usersService, 'updateToken').mockResolvedValue(null);

      expect(await service.logIn(loginUser)).toEqual({
        access_token: newToken,
      });
    });
  });
});
