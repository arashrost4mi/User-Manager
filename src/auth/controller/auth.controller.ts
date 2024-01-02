import {
  Controller,
  Post,
  Body,
  UseGuards,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { PermissionGuard, RequirePermissions } from '../guard/permission.guard';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { LoginUserDto } from 'src/user/dto/request/login-user.dto';
import { CreateRoleDto } from 'src/role/dto/request/create-role.dto';
import { CreatePermissionDto } from 'src/permission/dto/request/create-permission.dto';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('auth')
@UseGuards(JwtAuthGuard, PermissionGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    try {
      return await this.authService.login(data);
    } catch (err) {
      console.log(err);
    }
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('create/user')
  @RequirePermissions('create-user')
  async createUser(@Body() data: CreateUserDto) {
    try {
      return await this.authService.createUser(data);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  @Post('create/role')
  @RequirePermissions('create-role')
  async createRole(@Body() data: CreateRoleDto) {
    try {
      return await this.authService.createRole(data);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error creating role');
    }
  }

  @Post('create/permission')
  @RequirePermissions('create-permission')
  async createPermission(@Body() data: CreatePermissionDto) {
    try {
      return await this.authService.createPermission(data);
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Error creating permission');
    }
  }
}
