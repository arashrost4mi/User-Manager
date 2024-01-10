import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { AssignStatusUserDto } from '../dto/request/assignStatus-user.dto';
import { AssignRoleUserDto } from '../dto/request/assignRole-user.dto';
import { PrismaClient, User } from '@prisma/client';
import { UserStatus } from '../enum/status-user.enum';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        password: data.password,
        email: data.email,
        phone: data.phone,
        status: UserStatus.ACTIVE,
        roles: [],
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async assignRole(username: string, roleName: AssignRoleUserDto) {
    try {
      const user = await this.findByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      if (!Array.isArray(roleName.roles)) {
        throw new NotFoundException('Role not found');
      }

      for (const role of roleName.roles) {
        if (user.roles.includes(role)) {
          throw new ConflictException('User already has this role');
        }
        console.log(role);
        user.roles.push(role);
        console.log(user.roles);
      }

      console.log(user.roles);
      await this.prisma.user.update({
        where: {
          username: user.username,
        },
        data: {
          roles: user.roles,
        },
      });

      return { success: true, message: 'Role assigned successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }

  async assignStatus(username: string, status: AssignStatusUserDto) {
    try {
      const user = await this.findByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.status === status.status) {
        throw new ConflictException('User already has this status');
      }
      user.status = status.status;
      await this.prisma.user.update({
        where: {
          username: user.username,
        },
        data: {
          status: user.status,
        },
      });
      return { success: true, message: 'Status assigned successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
