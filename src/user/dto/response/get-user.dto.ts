import { User } from '@prisma/client';
export class GetUserDto {
  _Fullname: string;
  _Username: string;
  _Email: string;
  _Phone: string;
  _Status: string;
  _Role: string[];

  constructor(data: User) {
    this._Fullname = data.name;
    this._Username = data.username;
    this._Email = data.email;
    this._Phone = data.phone;
    this._Status = data.status;
    this._Role = data.roles;
  }
}
