import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: IUser[] = [];

  create(user: IUser) {
    this.users.push(user);
  }

  findAll(): IUser[] {
    return this.users;
  }
}
