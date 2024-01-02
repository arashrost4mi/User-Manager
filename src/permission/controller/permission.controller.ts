import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { PermissionService } from '../service/permission.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  PermissionGuard,
  RequirePermissions,
} from '../../auth/guard/permission.guard';

@Controller('permission')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('all')
  @RequirePermissions('view-permission')
  async findAll() {
    try {
      return await this.permissionService.findAll();
    } catch (error) {
      console.log(error, 'Error fetching all permissions');
      throw new NotFoundException('Unable to fetch all permissions');
    }
  }

  @Get('action/:action')
  @RequirePermissions('view-permission')
  async findByAction(@Param('action') action: string) {
    try {
      return await this.permissionService.findByAction(action);
    } catch (error) {
      console.log(error, 'Error fetching permission by action');
      throw new NotFoundException('Unable to fetch permission by action');
    }
  }

  @Get('id/:id')
  @RequirePermissions('view-permission')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.permissionService.findById(id);
    } catch (error) {
      console.log(error, 'Error fetching permission by id');
      throw new NotFoundException('Unable to fetch permission by id');
    }
  }
}
