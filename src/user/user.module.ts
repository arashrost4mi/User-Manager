import { Module } from '@nestjs/common';
import { UserService } from '../user/service/user.service';
import { UserController } from '../user/controller/user.controller';
import { UserRepository } from '../user/repository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [JwtModule],
  providers: [UserService, UserRepository, PrismaClient],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
