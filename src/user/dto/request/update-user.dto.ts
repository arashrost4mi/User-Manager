import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'arash',
    description: 'user`s name',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'arash',
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'arash@gmail.com',
    description: 'user`s email',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  email: string;

  @ApiProperty({
    example: '09123456789',
    description: 'user`s phone',
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR', { message: 'Phone number is not valid' })
  phone: string;
}
