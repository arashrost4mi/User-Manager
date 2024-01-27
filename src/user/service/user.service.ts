import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { AssignStatusUserDto } from '../dto/request/assignStatus-user.dto';
import { Serialize } from '../../common/serializer/user.serializer';
import { GetUserDto } from '../dto/response/get-user.dto';
import { UserServiceInterface } from '../interface/user-service.interface';
import { AssignRoleUserDto } from '../dto/request/assignRole-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const user = await this.userRepository.createUser(data);
    return Serialize.serialize(user, GetUserDto);
  }

  async findAll() {
    const users = await this.userRepository.findAll();
    return Serialize.serialize(users, GetUserDto);
  }

  async findById(id: number) {
    const user = await this.userRepository.findById(id);
    return Serialize.serialize(user, GetUserDto);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findByUsername(username);
    if (user) {
      try {
        return Serialize.serialize(user, GetUserDto);
      } catch (err) {
        console.log(err, 'Error fetching user by username');
      }
    } else {
      console.log('User not found');
      return null;
    }
  }

  async findUserForLogin(username: string) {
    try {
      const user = await this.userRepository.findByUsername(username);
      if (user) {
        return user;
      } else {
        throw new NotFoundException('User not found');
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async assignRole(username: string, roleName: AssignRoleUserDto) {
    try {
      if (Array.isArray(roleName)) {
        for (const role of roleName) {
          await this.userRepository.assignRole(username, role);
        }
      } else {
        return await this.userRepository.assignRole(username, roleName);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeRole(username: string, roleName: AssignRoleUserDto) {
    try {
      if (Array.isArray(roleName)) {
        for (const role of roleName) {
          await this.userRepository.removeRole(username, role);
        }
      } else {
        return await this.userRepository.removeRole(username, roleName);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async assignStatus(username: string, status: AssignStatusUserDto) {
    try {
      return await this.userRepository.assignStatus(username, status);
    } catch (error) {
      throw new Error(error);
    }
  }

  async changeStatus(username: string, status: AssignStatusUserDto) {
    try {
      return await this.userRepository.changeStatus(username, status);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateUser(username: string, data: CreateUserDto) {
    try {
      return await this.userRepository.updateUser(username, data);
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeUser(username: string) {
    try {
      return await this.userRepository.removeUser(username);
    } catch (error) {
      throw new Error(error);
    }
  }
}
