import { CreateRoleDto } from '../dto/request/create-role.dto';
import { GetRoleDto } from '../dto/response/get-role.dto';

export interface RoleServiceInterface {
  createRole(
    data: CreateRoleDto,
  ): Promise<typeof GetRoleDto | (typeof GetRoleDto)[]>;

  findAll(): Promise<typeof GetRoleDto | (typeof GetRoleDto)[]>;

  findById(id: number): Promise<typeof GetRoleDto | (typeof GetRoleDto)[]>;

  findByName(name: string): Promise<typeof GetRoleDto | (typeof GetRoleDto)[]>;

  findAllPermissions(roleName: string | string[]): Promise<string[]>;
}
