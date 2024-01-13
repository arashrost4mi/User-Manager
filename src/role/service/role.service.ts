import { Injectable } from '@nestjs/common';
import { RoleServiceInterface } from '../interface/role-service.interface';
import { RoleRepository } from '../repository/role.repository';
import { Serialize } from 'src/serializer/user.serializer';
import { CreateRoleDto } from '../dto/request/create-role.dto';
import { GetRoleDto } from '../dto/response/get-role.dto';

@Injectable()
export class RoleService implements RoleServiceInterface {
  constructor(private readonly roleRepository: RoleRepository) {}
  async createRole(data: CreateRoleDto) {
    try {
      const roleData = {
        name: data.name,
        description: data.description,
        permissions: data.permissions,
      };
      const role = await this.roleRepository.createRole(roleData);
      return Serialize.serialize(role, GetRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAll() {
    try {
      const roles = await this.roleRepository.findAll();
      return Serialize.serialize(roles, GetRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: number) {
    try {
      const role = await this.roleRepository.findById(id);
      return Serialize.serialize(role, GetRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }
  async findByName(name: string) {
    try {
      const role = await this.roleRepository.findByName(name);
      return Serialize.serialize(role, GetRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAllPermissions(roleName: string | string[]) {
    try {
      const userPermissions: string[] = [];
      if (Array.isArray(roleName)) {
        for (const role of roleName) {
          const permissionsResult =
            await this.roleRepository.findAllPermissions(role);
          const permissions = permissionsResult.permissions || [];
          userPermissions.push(...permissions);
        }
        return userPermissions;
      } else {
        const permissionsResult =
          await this.roleRepository.findAllPermissions(roleName);
        const permissions = permissionsResult.permissions || [];
        userPermissions.push(...permissions);
      }
      return userPermissions;
    } catch (error) {
      throw new Error(error);
    }
  }
}
