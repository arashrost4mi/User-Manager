import { LoginUserDto } from 'src/user/dto/request/login-user.dto';
import { LoginOtpDto } from 'src/user/dto/request/login-otp.dto';
import { SendOtpDto } from 'src/user/dto/request/send-otp.dto';
import { CreateUserDto } from 'src/user/dto/request/create-user.dto';
import { GetUserDto } from 'src/user/dto/response/get-user.dto';
import { CreateRoleDto } from 'src/role/dto/request/create-role.dto';
import { GetRoleDto } from 'src/role/dto/response/get-role.dto';
import { CreatePermissionDto } from 'src/permission/dto/request/create-permission.dto';
import { GetPermissionDto } from 'src/permission/dto/response/get-permission.dto';

export interface authServiceInerface {
  loginWithPassword(data: LoginUserDto): Promise<{
    access_token: string;
    refresh_token: string;
  }>;

  loginWithOtp(data: LoginOtpDto): Promise<{
    access_token: string;
    refresh_token: string;
  }>;

  createToken(username: string): Promise<{
    access_token: string;
    refresh_token: string;
  }>;

  refreshToken(refreshToken: string): Promise<{
    access_token: string;
    refresh_token: string;
  }>;

  sendSmsWithOtp(username: SendOtpDto): Promise<{
    success: boolean;
    data: string;
    message: string;
  }>;

  sendEmailWithOtp(username: SendOtpDto): Promise<{
    success: boolean;
    data: string;
    message: string;
  }>;

  createUser(
    data: CreateUserDto,
  ): Promise<typeof GetUserDto | (typeof GetUserDto)[]>;

  createRole(
    data: CreateRoleDto,
  ): Promise<typeof GetRoleDto | (typeof GetRoleDto)[]>;

  createPermission(
    data: CreatePermissionDto,
  ): Promise<typeof GetPermissionDto | (typeof GetPermissionDto)[]>;
}
