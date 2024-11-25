import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(user: IUser): Promise<{ user: User; access_token: string }> {
    const SALT_ROUNDS = 10;
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcryptjs.hash(user.password, salt);

    const newUser = this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: hashedPassword,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const payload = { username: savedUser.name, sub: savedUser.id };
    const access_token = this.jwtService.sign(payload);

    return { user: savedUser, access_token };
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        posts: true,
      },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  validatePassword(plainPassword: string, hash: string): Promise<boolean> {
    return bcryptjs.compare(plainPassword, hash);
  }
}
