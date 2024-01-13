import { CreatePermissionDto } from '../dto/request/create-permission.dto';
import { GetPermissionDto } from '../dto/response/get-permission.dto';

export interface PermissionServiceInterface {
  createPermission(
    data: CreatePermissionDto,
  ): Promise<typeof GetPermissionDto | (typeof GetPermissionDto)[]>;

  findAll(): Promise<typeof GetPermissionDto | (typeof GetPermissionDto)[]>;

  findById(
    id: number,
  ): Promise<typeof GetPermissionDto | (typeof GetPermissionDto)[]>;

  findByAction(
    action: string,
  ): Promise<typeof GetPermissionDto | (typeof GetPermissionDto)[]>;
}
