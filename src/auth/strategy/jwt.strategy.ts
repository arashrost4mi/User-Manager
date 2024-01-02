import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../service/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'FGjAOthpL7AYdaFQjuIt8DEbSOQr4wKafgUJKoPxUw3qmvRQOz',
    });
  }

  async validate(payload) {
    if (payload.tokenType !== 'access') {
      throw new UnauthorizedException('Invalid token type');
    }

    const user = await this.authService.validateUserByUsername(
      payload.username,
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      username: payload.username,
      status: payload.status,
      roles: payload.roles,
      permissions: payload.permissions,
    };
  }
}