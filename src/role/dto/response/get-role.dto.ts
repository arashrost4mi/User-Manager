import { Role } from '@prisma/client';

export class GetRoleDto {
  _Name: string;
  _Description: string;
  _Permissions: string[];
  constructor(data: Role) {
    this._Name = data.name;
    this._Description = data.description;
    this._Permissions = data.permissions;
  }
}
