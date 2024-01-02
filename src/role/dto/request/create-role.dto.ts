import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole } from '../../enum/role.enum';
import { PermissionAction } from 'src/permission/enum/permission.enum';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserRole), { each: true })
  name: string;

  @IsString()
  @MaxLength(65)
  description: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsEnum(PermissionAction, { each: true })
  permissions: string[];
}
