import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/service/user.service';
import { CreateUserDto } from '../../user/dto/request/create-user.dto';
import { LoginUserDto } from 'src/user/dto/request/login-user.dto';
import { LoginOtpDto } from 'src/user/dto/request/login-otp.dto';
import { RoleService } from 'src/role/service/role.service';
import { CreateRoleDto } from 'src/role/dto/request/create-role.dto';
import { PermissionService } from 'src/permission/service/permission.service';
import { CreatePermissionDto } from 'src/permission/dto/request/create-permission.dto';
import { OtpService } from './otp.service';
import { Redis } from 'ioredis';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { SendOtpDto } from 'src/user/dto/request/send-otp.dto';

@Injectable()
export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private smsEndpoint = 'sms/send/otp';
  private emailEndpoint = 'email/send/otp';

  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private userService: UserService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private redisClient: Redis,
  ) {}

  async loginWithPassword(data: LoginUserDto) {
    try {
      const user = await this.userService.findUserForLogin(data.username);

      if (user.status !== 'active') {
        throw new UnauthorizedException('User is not active');
      }

      if (await bcrypt.compare(data.password, user.password)) {
        return await this.createToken(data.username);
      } else {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch (err) {
      throw new InternalServerErrorException('Error logging in');
    }
  }

  async loginWithOtp(data: LoginOtpDto) {
    try {
      const user = await this.userService.findUserForLogin(data.username);

      if (user.status !== 'active') {
        throw new UnauthorizedException('User is not active');
      }

      const otp = await this.redisClient.get(`login-${data.username}`);

      if (!otp) {
        throw new NotFoundException('OTP not found');
      }

      const otpRemainingTime = await this.redisClient.ttl(
        `login-${data.username}`,
      );
      console.log(otpRemainingTime);
      if (otpRemainingTime < 0) {
        throw new NotFoundException('OTP expired');
      }

      if (parseInt(otp) === data.otp) {
        return await this.createToken(data.username);
      } else {
        throw new UnauthorizedException('Invalid OTP');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async createToken(username: string) {
    try {
      const user = await this.userService.findUserForLogin(username);
      const userPermissions = await this.roleService.findAllPermissions(
        user.roles,
      );

      return {
        access_token: this.jwtService.sign({
          username: user.username,
          status: user.status,
          roles: user.roles,
          permissions: userPermissions,
          tokenType: 'access',
        }),
        refresh_token: this.jwtService.sign(
          {
            username: user.username,
            status: user.status,
            roles: user.roles,
            permissions: userPermissions,
            tokenType: 'refresh',
          },
          {
            expiresIn: '1d',
          },
        ),
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating token');
    }
  }

  async sendSmsWithOtp(username: SendOtpDto) {
    try {
      const user = await this.userService.findUserForLogin(username.username);

      const otp = await this.otpService.generateOtp(username.username);

      await this.redisClient.set(
        `login-${username.username}`,
        otp,
        'EX',
        60 * 5,
      );

      const url = `${this.apiUrl}/${this.smsEndpoint}`;
      const response = await axios.post(url, {
        to: user.phone,
        otp: otp,
      });

      return {
        success: true,
        data: response.data,
        message: 'SMS sent successfully.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error sending SMS');
    }
  }

  async sendEmailWithOtp(username: SendOtpDto) {
    try {
      const user = await this.userService.findUserForLogin(username.username);

      const otp = await this.otpService.generateOtp(username.username);

      await this.redisClient.set(
        `login-${username.username}`,
        otp,
        'EX',
        60 * 5,
      );

      const url = `${this.apiUrl}/${this.emailEndpoint}`;
      const response = await axios.post(url, {
        to: user.email,
        otp: otp,
      });

      return {
        success: true,
        data: response.data,
        message: 'Email sent successfully.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error sending Email');
    }
  }

  async createUser(data: CreateUserDto) {
    try {
      return await this.userService.createUser(data);
    } catch (err) {
      console.log(err, 'Error creating user');
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async refreshToken(refreshToken: string) {
    try {
      if (!refreshToken) {
        throw new UnauthorizedException('No refresh token provided');
      }

      const payload = await this.jwtService.verify(refreshToken);
      const user = await this.userService.findUserForLogin(payload.username);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.status !== 'active') {
        throw new UnauthorizedException('User is inactive or blocked');
      }
      if (payload.tokenType !== 'refresh') {
        throw new UnauthorizedException('Invalid token type');
      }

      return await this.createToken(user.username);
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async createRole(data: CreateRoleDto) {
    try {
      return await this.roleService.createRole(data);
    } catch (err) {
      console.log(err, 'Error creating role');
      throw new InternalServerErrorException('Error creating role');
    }
  }

  async createPermission(data: CreatePermissionDto) {
    try {
      return await this.permissionService.createPermission(data);
    } catch (err) {
      console.log(err, 'Error creating permission');
      throw new InternalServerErrorException('Error creating permission');
    }
  }
}
