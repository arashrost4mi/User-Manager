import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { Redis } from 'ioredis';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleController } from './role/controller/role.controller';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [UserModule, AuthModule, JwtModule, RoleModule, PermissionModule],
  controllers: [RoleController],
  providers: [
    {
      provide: 'REDIS',
      useValue: new Redis({
        host: 'localhost',
        port: 6379,
      }),
    },
    {
      provide: PrismaClient,
      useClass: PrismaClient,
    },
  ],
})
export class AppModule {}
