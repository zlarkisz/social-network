import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authenticate a user and return a JWT token' })
  @ApiResponse({ status: 200, description: 'Token successfully generated.' })
  @ApiResponse({ status: 401, description: 'Invalid email or password.' })
  @Post('get-token')
  getToken(@Body() loginUserDto: LoginUserDto) {
    return this.authService.logIn(loginUserDto);
  }
}
