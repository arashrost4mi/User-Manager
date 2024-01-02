import {
  Injectable,
  SetMetadata,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (
      !user ||
      !user.roles ||
      !Array.isArray(user.roles) ||
      !user.permissions ||
      !Array.isArray(user.permissions)
    ) {
      return false;
    }

    console.log(user);

    return user.permissions;
  }
}

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata('permissions', permissions);
