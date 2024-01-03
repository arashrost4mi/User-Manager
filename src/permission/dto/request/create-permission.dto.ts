import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { PermissionAction } from 'src/permission/enum/permission.enum';

export class CreatePermissionDto {
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(PermissionAction), {
    each: true,
    message: 'Invalid action',
  })
  action: string;

  @IsString()
  @MaxLength(65)
  description: string;
}
