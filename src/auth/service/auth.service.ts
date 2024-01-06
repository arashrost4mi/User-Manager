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
import { RoleService } from 'src/role/service/role.service';
import { CreateRoleDto } from 'src/role/dto/request/create-role.dto';
import { PermissionService } from 'src/permission/service/permission.service';
import { CreatePermissionDto } from 'src/permission/dto/request/create-permission.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private roleService: RoleService,
    private permissionService: PermissionService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUserForLogin(username);
    try {
      if (user && (await bcrypt.compare(password, user.password))) {
        const result = {
          name: user.name,
          username: user.username,
          status: user.status,
          roles: user.roles,
        };
        return result;
      } else {
        throw new UnauthorizedException('Invalid username or password');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'Error validating user credentials',
      );
    }
  }

  async validateUserByUsername(username: string) {
    try {
      const user = await this.userService.findUserForLogin(username);
      if (user) {
        return true;
      }
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(data: LoginUserDto) {
    try {
      if (!data) {
        throw new NotFoundException('No data provided');
      }

      const user = await this.userService.findUserForLogin(data.username);

      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.status !== 'active') {
        throw new UnauthorizedException('User is not active');
      }

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
    } catch (err) {
      throw new InternalServerErrorException('Error logging in');
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
          { expiresIn: '1d' },
        ),
      };
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
