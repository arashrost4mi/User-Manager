import { Module } from '@nestjs/common';
import { PermissionService } from './service/permission.service';
import { PermissionController } from './controller/permission.controller';
import { PrismaClient } from '@prisma/client';
import { PermissionRepository } from './repository/permission.repository';

@Module({
  providers: [PermissionService, PermissionRepository, PrismaClient],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissionModule {}
