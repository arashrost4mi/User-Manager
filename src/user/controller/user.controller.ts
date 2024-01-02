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
    @Body('roles') roles: string[],
  ) {
    try {
      return await this.userService.assignRole(username, roles);
    } catch (error) {
      throw new Error(error);
    }
  }
}
