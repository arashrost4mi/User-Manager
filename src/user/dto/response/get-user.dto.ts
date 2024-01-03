import { User } from '@prisma/client';
export class GetUserDto {
  _Fullname: string;
  _Username: string;
  _Status: string;
  _Role: string[];

  constructor(data: User) {
    this._Fullname = data.name;
    this._Username = data.username;
    this._Status = data.status;
    this._Role = data.roles;
  }
}
