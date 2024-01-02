import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { RoleModule } from 'src/role/role.module';
import { PermissionModule } from 'src/permission/permission.module';
import { env } from 'process';

@Module({
  imports: [
    UserModule,
    PassportModule,
    RoleModule,
    PermissionModule,
    JwtModule.register({
      secret: env.SECRET_KEY,
      signOptions: {
        expiresIn: env.EXPIRES_IN,
      },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
