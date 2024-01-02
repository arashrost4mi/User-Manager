import { Permission } from '@prisma/client';

export class GetPermissionDto {
  _Action: string;
  _Description: string;
  constructor(data: Permission) {
    this._Action = data.action;
    this._Description = data.description;
  }
}
