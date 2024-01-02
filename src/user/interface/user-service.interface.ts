import { CreateUserDto } from '../dto/request/create-user.dto';

export interface UserServiceInterface {
  createUser(data: CreateUserDto);
  findAll();
  findById(id: number);
  findByUsername(username: string);
  findUserForLogin(username: string);
}
