import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { RoleService } from '../service/role.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  PermissionGuard,
  RequirePermissions,
} from 'src/auth/guard/permission.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Role')
@Controller('role')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('all')
  @RequirePermissions('view-role')
  async findAll() {
    try {
      return await this.roleService.findAll();
    } catch (error) {
      console.log(error, 'Error fetching all roles');
      throw new NotFoundException('Unable to fetch all roles');
    }
  }

  @Get('name/:name')
  @RequirePermissions('view-role')
  async findByName(@Param('name') name: string) {
    try {
      return await this.roleService.findByName(name);
    } catch (error) {
      console.log(error, 'Error fetching role by name');
      throw new NotFoundException('Unable to fetch role by name');
    }
  }

  @Get('id/:id')
  @RequirePermissions('view-role')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.roleService.findById(id);
    } catch (error) {
      console.log(error, 'Error fetching role by id');
      throw new NotFoundException('Unable to fetch role by id');
    }
  }
}
