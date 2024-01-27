import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePermissionDto } from '../dto/request/create-permission.dto';
import { UpdatePermissionDto } from '../dto/request/update-permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createPermission(data: CreatePermissionDto) {
    try {
      return await this.prisma.permission.create({
        data: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.permission.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.permission.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByAction(action: string) {
    try {
      return await this.prisma.permission.findUnique({
        where: {
          action: action,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePermission(id: number, data: UpdatePermissionDto) {
    try {
      return await this.prisma.permission.update({
        where: {
          id: id,
        },
        data: {
          description: data.description,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removePermission(id: number) {
    try {
      await this.prisma.permission.delete({
        where: {
          id: id,
        },
      });
      return { success: true, message: 'Permission removed successfully' };
    } catch (error) {
      throw new Error(error);
    }
  }
}
