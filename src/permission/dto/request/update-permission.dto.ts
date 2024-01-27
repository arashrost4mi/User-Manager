import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class UpdatePermissionDto {
  @ApiProperty({ example: 'create-permission', maxLength: 65 })
  @IsString()
  @MaxLength(65)
  description: string;
}
