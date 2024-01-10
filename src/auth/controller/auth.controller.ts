import {
  Controller,
  Post,
  Body,
  UseGuards,
  // UnauthorizedException,
  // InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { PermissionGuard } from '../guard/permission.guard';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { LoginUserDto } from 'src/user/dto/request/login-user.dto';
import { LoginOtpDto } from 'src/user/dto/request/login-otp.dto';
import { CreateRoleDto } from 'src/role/dto/request/create-role.dto';
import { CreatePermissionDto } from 'src/permission/dto/request/create-permission.dto';
import { SendOtpDto } from 'src/user/dto/request/send-otp.dto';
// import { JwtAuthGuard } from '../guard/jwt-auth.guard';

@Controller('auth')
@UseGuards(/* JwtAuthGuard, */ PermissionGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('login/password')
  async loginWithPassword(@Body() data: LoginUserDto) {
    try {
      return await this.authService.loginWithPassword(data);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid username or password', err);
    }
  }

  // @UseGuards(AuthGuard('local'))
  @Post('login/otp')
  async loginWithOtp(@Body() data: LoginOtpDto) {
    try {
      return await this.authService.loginWithOtp(data);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('send/otp/email')
  async sendEmailWithOtp(@Body() username: SendOtpDto) {
    try {
      return await this.authService.sendEmailWithOtp(username);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid username', err);
    }
  }

  @Post('send/otp/sms')
  async sendSmsWithOtp(@Body() username: SendOtpDto) {
    try {
      return await this.authService.sendSmsWithOtp(username);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid username', err);
    }
  }

  @Post('refresh')
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    try {
      return await this.authService.refreshToken(refreshToken);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid refresh token', err);
    }
  }

  @Post('create/user')
  // @RequirePermissions('create-user')
  async createUser(@Body() data: CreateUserDto) {
    try {
      return await this.authService.createUser(data);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid credentials for user', err);
    }
  }

  @Post('create/role')
  // @RequirePermissions('create-role')
  async createRole(@Body() data: CreateRoleDto) {
    try {
      return await this.authService.createRole(data);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid credentials for role', err);
    }
  }

  @Post('create/permission')
  // @RequirePermissions('create-permission')
  async createPermission(@Body() data: CreatePermissionDto) {
    try {
      return await this.authService.createPermission(data);
    } catch (err) {
      console.log(err);
      throw new BadRequestException('Invalid credentials for permission', err);
    }
  }
}
