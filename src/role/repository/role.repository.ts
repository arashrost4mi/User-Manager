import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateRoleDto } from '../dto/request/create-role.dto';
import { UpdateRoleDto } from '../dto/request/update-role.dto';

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

  async updateRole(name: string, data: UpdateRoleDto) {
    try {
      const role = await this.findByName(name);
      return await this.prisma.role.update({
        where: {
          id: role.id,
        },
        data: {
          name: data.name,
          description: data.description,
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

  async updateRolePermissions(roleName: string, permissions: string[]) {
    try {
      const role = await this.findByName(roleName);
      return await this.prisma.role.update({
        where: {
          id: role.id,
        },
        data: {
          permissions: permissions,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeRole(roleName: string) {
    try {
      const role = await this.findByName(roleName);
      await this.prisma.role.delete({
        where: {
          id: role.id,
        },
      });

      return {
        success: true,
        message: 'Role removed successfully',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
