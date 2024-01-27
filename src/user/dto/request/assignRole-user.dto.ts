import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, ArrayUnique, IsArray, IsEnum } from 'class-validator';
import { UserRole } from 'src/role/enum/role.enum';

export class AssignRoleUserDto {
  @ApiProperty({
    description: 'List of roles',
    example: ['admin', 'user'],
    required: true,
    uniqueItems: true,
    isArray: true,
    enum: UserRole,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsEnum(UserRole, { each: true, message: 'Invalid role' })
  roles: string[];
}
