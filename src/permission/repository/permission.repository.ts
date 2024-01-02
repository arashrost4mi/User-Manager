import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePermissionDto } from '../dto/request/create-permission.dto';

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
}
