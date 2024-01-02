import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/request/create-permission.dto';
import { GetPermissionDto } from '../dto/response/get-permission.dto';
import { PermissionServiceInterface } from '../interface/permission-service.interface';
import { Serialize } from 'src/user/serializer/user.serializer';
import { PermissionRepository } from '../repository/permission.repository';

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
}
