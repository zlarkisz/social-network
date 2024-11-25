import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('get-token')
  getToken(@Body() loginUserDto: LoginUserDto) {
    return this.authService.logIn(loginUserDto);
  }
}
