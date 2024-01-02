import { CreateRoleDto } from '../dto/request/create-role.dto';

export interface RoleServiceInterface {
  createRole(data: CreateRoleDto);
  findAll();
  findById(id: number);
  findByName(name: string);
}
