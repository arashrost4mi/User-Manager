import { IsString, IsNotEmpty, IsIn } from 'class-validator';
import { UserStatus } from 'src/user/enum/status-user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserStatus), { message: 'Invalid status' })
  status: string;
}
