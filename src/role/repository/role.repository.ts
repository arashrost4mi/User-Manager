import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from '../dto/request/create-role.dto';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createRole(data: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: data,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.role.findMany();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number) {
    try {
      return await this.prisma.role.findUnique({
        where: {
          id: id,
        },
      });
    } catch (error) {}
  }

  async findByName(name: string) {
    try {
      return await this.prisma.role.findUnique({
        where: {
          name: name,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllPermissions(roleName: string) {
    try {
      return await this.prisma.role.findUnique({
        where: {
          name: roleName,
        },
        select: {
          permissions: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
