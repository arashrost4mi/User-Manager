import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createUser(data: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: data,
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

  async assignRole(username: string, roleName: string) {
    try {
      const user = await this.findByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      if (user.roles.includes(roleName)) {
        throw new ConflictException('User already has this role');
      }

      user.roles.push(roleName);
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
}
