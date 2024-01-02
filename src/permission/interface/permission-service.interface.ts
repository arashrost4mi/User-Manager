import { CreatePermissionDto } from '../dto/request/create-permission.dto';

export interface PermissionServiceInterface {
  createPermission(data: CreatePermissionDto);
  findAll();
  findById(id: number);
  findByAction(action: string);
}
