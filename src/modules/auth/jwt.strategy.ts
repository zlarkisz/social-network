import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Витягує токен з заголовка Authorization
      ignoreExpiration: false, // Ігнорувати закінчення терміну дії токену не потрібно
      secretOrKey: configService.get<string>('JWT_SECRET'), // Отримує секретний ключ з конфігурації
    });
  }

  async validate(payload: any) {
    // Payload — це розшифрована інформація з токену.
    // Повертаємо інформацію про користувача, яку будемо використовувати в запиті.
    return { userId: payload.sub, username: payload.username };
  }
}
