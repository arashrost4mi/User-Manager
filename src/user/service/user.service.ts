import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDto } from '../dto/request/create-user.dto';
import { Serialize } from '../serializer/user.serializer';
import { GetUserDto } from '../dto/get-user.dto';
import { UserServiceInterface } from '../interface/user-service.interface';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto) {
    const userData = {
      name: data.name,
      username: data.username,
      password: data.password,
      status: data.status,
    };
    const user = await this.userRepository.createUser(userData);
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
    return await this.userRepository.findByUsername(username);
  }

  async assignRole(username: string, roleName: string | string[]) {
    try {
      if (Array.isArray(roleName)) {
        for (const role of roleName) {
          await this.userRepository.assignRole(username, role);
        }
      } else {
        await this.userRepository.assignRole(username, roleName);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
