import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {}

  @Get()
  findAll(): Promise<User[]> {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {}
  
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {}
}
