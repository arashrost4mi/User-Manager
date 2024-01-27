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
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Role name',
    example: 'admin',
    required: true,
    type: 'string',
    enum: Object.values(UserRole),
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserRole), { each: true, message: 'Invalid role' })
  name: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Admin role',
    required: true,
    type: 'string',
    maxLength: 65,
  })
  @IsString()
  @MaxLength(65)
  description: string;

  @ApiProperty({
    description: 'Role permissions',
    example: ['create', 'read', 'update', 'delete'],
    required: true,
    type: ['string'],
    isArray: true,
    enum: Object.values(PermissionAction),
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsEnum(PermissionAction, { each: true, message: 'Invalid permission' })
  permissions: string[];
}
