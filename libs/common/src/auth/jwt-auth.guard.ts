import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AUTH_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  canActivate(context: ExecutionContext): Observable<boolean> | boolean {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    if (!jwt) return false;
    return this.authClient.send('authenticate', { Authentication: jwt }).pipe(
      tap((res) => {
        context.switchToHttp().getRequest().user = res;
      }),
      map(() => true),
    );
  }
}
