import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';

import { createClient } from 'redis';
import { Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

const redisClient = createClient({ url: 'redis://redis:6379' });
redisClient.connect();

@Injectable()
export class RedisCacheInterceptor implements NestInterceptor {
  constructor(private readonly ttl: number) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const key = `cache:${request.url}`;

    return from(redisClient.get(key)).pipe(
      switchMap((cachedData) => {
        if (cachedData) {
          return from(Promise.resolve(JSON.parse(cachedData)));
        }

        return next.handle().pipe(
          tap((data) => {
            redisClient.set(key, JSON.stringify(data), { EX: this.ttl });
          }),
        );
      }),
    );
  }
}

export function Cache(options: { ttl: number }) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    UseInterceptors(new RedisCacheInterceptor(options.ttl))(
      target,
      key,
      descriptor,
    );
  };
}
