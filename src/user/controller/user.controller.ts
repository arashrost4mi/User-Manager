import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import {
  PermissionGuard,
  RequirePermissions,
} from 'src/auth/guard/permission.guard';
import { AssignRoleUserDto } from '../dto/request/assignRole-user.dto';
import { AssignStatusUserDto } from '../dto/request/assignStatus-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @RequirePermissions('view-user')
  async findAll() {
    try {
      return this.userService.findAll();
    } catch (err) {
      console.log(err, 'Error fetching all users');
    }
  }

  @Get('id/:id')
  @RequirePermissions('view-user')
  async findById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.userService.findById(id);
    } catch (err) {
      console.log(err, 'Error fetching user by id');
    }
  }

  @Get('username/:username')
  @RequirePermissions('view-user')
  async findByUsername(@Param('username') username: string) {
    try {
      return this.userService.findByUsername(username);
    } catch (err) {
      console.log(err, 'Error fetching user by username');
    }
  }

  @Put('assign-role/:username')
  @RequirePermissions('update-user')
  async assignRole(
    @Param('username') username: string,
    @Body() roles: AssignRoleUserDto,
  ) {
    try {
      return await this.userService.assignRole(username, roles);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put('assign-status/:username')
  @RequirePermissions('update-user')
  async assignStatus(
    @Param('username') username: string,
    @Body('status') status: AssignStatusUserDto,
  ) {
    try {
      return await this.userService.assignStatus(username, status);
    } catch (error) {
      throw new Error(error);
    }
  }
}
