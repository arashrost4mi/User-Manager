import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/request/create-permission.dto';
import { GetPermissionDto } from '../dto/response/get-permission.dto';
import { PermissionServiceInterface } from '../interface/permission-service.interface';
import { Serialize } from 'src/common/serializer/user.serializer';
import { PermissionRepository } from '../repository/permission.repository';
import { UpdatePermissionDto } from '../dto/request/update-permission.dto';

@Injectable()
export class PermissionService implements PermissionServiceInterface {
  constructor(private readonly permissionRepository: PermissionRepository) {}
  async createPermission(data: CreatePermissionDto) {
    try {
      const permissionData = {
        action: data.action,
        description: data.description,
      };
      const permission =
        await this.permissionRepository.createPermission(permissionData);
      return Serialize.serialize(permission, GetPermissionDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll() {
    try {
      const permissions = await this.permissionRepository.findAll();
      return Serialize.serialize(permissions, GetPermissionDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: number) {
    try {
      const permission = await this.permissionRepository.findById(id);
      return Serialize.serialize(permission, GetPermissionDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByAction(action: string) {
    try {
      const permission = await this.permissionRepository.findByAction(action);
      return Serialize.serialize(permission, GetPermissionDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updatePermission(action: string, data: UpdatePermissionDto) {
    try {
      const permission = await this.permissionRepository.findByAction(action);
      return await this.permissionRepository.updatePermission(
        permission.id,
        data,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async removePermission(action: string) {
    try {
      const permission = await this.permissionRepository.findByAction(action);
      return await this.permissionRepository.removePermission(permission.id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
