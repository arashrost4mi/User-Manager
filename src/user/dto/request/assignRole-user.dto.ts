import { IsNotEmpty, ArrayUnique, IsArray, IsEnum } from 'class-validator';
import { UserRole } from 'src/role/enum/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsEnum(UserRole, { each: true, message: 'Invalid role' })
  roles: string[];
}
