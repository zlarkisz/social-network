import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ILoginUser } from './login-user.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async logIn(loginUser: ILoginUser) {
    const { email, password } = loginUser;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.token) {
      try {
        const isTokenValid = this.jwtService.verify(user.token);

        if (isTokenValid) {
          return { access_token: user.token };
        }
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          this.logger.warn('Token has expired, creating a new one.');
        } else {
          this.logger.error('Token verification failed:', error);
        }
      }
    }

    const payload = { username: user.name, sub: user.id };
    const access_token = this.jwtService.sign(payload);

    user.token = access_token;

    await this.usersService.updateToken(user.id, access_token);

    return { access_token };
  }
}
