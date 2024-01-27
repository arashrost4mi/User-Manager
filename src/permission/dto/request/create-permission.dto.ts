import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PermissionAction } from 'src/permission/enum/permission.enum';

export class CreatePermissionDto {
  @ApiProperty({ description: 'action', enum: Object.values(PermissionAction) })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PermissionAction), {
    each: true,
    message: 'Invalid action',
  })
  action: string;

  @ApiProperty({ description: 'description', maxLength: 65 })
  @IsString()
  @MaxLength(65)
  description: string;
}
