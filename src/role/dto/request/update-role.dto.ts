import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRole } from '../../enum/role.enum';

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserRole), { each: true, message: 'Invalid role' })
  name: string;

  @IsString()
  @MaxLength(65)
  description: string;
}
