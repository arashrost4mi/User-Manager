import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn, IsString } from 'class-validator';
import { UserStatus } from 'src/user/enum/status-user.enum';

export class AssignStatusUserDto {
  @ApiProperty({
    example: 'active',
    description: 'User status',
    enum: Object.values(UserStatus),
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(Object.values(UserStatus), { message: 'Invalid role' })
  status: string;
}
