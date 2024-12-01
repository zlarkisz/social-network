import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Observable } from 'rxjs';

@Injectable()
export class ForbiddenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request.method === 'POST') {
      const { title, content, userId } = request.body;

      if (!title || !content || !userId) {
        throw new ForbiddenException('Required parameters are missing');
      }
    }

    return true;
  }
}
