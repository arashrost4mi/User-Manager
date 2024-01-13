import { CreateUserDto } from '../dto/request/create-user.dto';
import { GetUserDto } from '../dto/response/get-user.dto';
import { User } from '@prisma/client';
import { AssignRoleUserDto } from '../dto/request/assignRole-user.dto';
import { AssignStatusUserDto } from '../dto/request/assignStatus-user.dto';

export interface UserServiceInterface {
  createUser(
    data: CreateUserDto,
  ): Promise<typeof GetUserDto | (typeof GetUserDto)[]>;

  findAll(): Promise<typeof GetUserDto | (typeof GetUserDto)[]>;

  findById(id: number): Promise<typeof GetUserDto | (typeof GetUserDto)[]>;

  findByUsername(
    username: string,
  ): Promise<typeof GetUserDto | (typeof GetUserDto)[]>;

  findUserForLogin(username: string): Promise<User>;

  assignRole(
    username: string,
    roleName: AssignRoleUserDto,
  ): Promise<{
    success: boolean;
    message: string;
  }>;

  assignStatus(
    username: string,
    status: AssignStatusUserDto,
  ): Promise<{
    success: boolean;
    message: string;
  }>;
}
