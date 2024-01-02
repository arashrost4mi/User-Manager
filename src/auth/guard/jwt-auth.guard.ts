import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const enhancedUser = {
      username: user.username,
      status: user.status,
      roles: user.roles,
      permissions: user.permissions,
    };

    console.log(info);
    return enhancedUser;
  }
}
