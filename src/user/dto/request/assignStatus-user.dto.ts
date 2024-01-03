import { IsNotEmpty, IsIn, IsString } from 'class-validator';
import { UserStatus } from 'src/user/enum/status-user.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserStatus), { message: 'Invalid role' })
  status: string;
}