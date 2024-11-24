import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: IUser): Promise<User> {
    const SALT_ROUNDS = 10;
    const salt = await bcryptjs.genSalt(SALT_ROUNDS);

    user.password = await bcryptjs.hash(user.password, salt);

    return this.usersRepository.save(user);
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

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
