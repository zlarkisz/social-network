import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created.',
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; access_token: string }> {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'List of users.', type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Retrieve a specific user by ID' })
  @ApiResponse({ status: 200, description: 'User found.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
