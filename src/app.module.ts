import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule]
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users');
  }
}
