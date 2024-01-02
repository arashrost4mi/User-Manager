import { Module } from '@nestjs/common';
import { RoleService } from './service/role.service';
import { RoleController } from './controller/role.controller';
import { PrismaClient } from '@prisma/client';
import { RoleRepository } from './repository/role.repository';

@Module({
  providers: [RoleService, RoleRepository, PrismaClient],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
