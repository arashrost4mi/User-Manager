import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'User username',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Ab120000',
    description: 'User password',
    required: true,
    type: String,
    minLength: 8,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password is not strong enough. It must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.',
  })
  password: string;

  @ApiProperty({
    example: 'johndoe@gmail.com',
    description: 'User email',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  email: string;

  @ApiProperty({
    example: '09123456789',
    description: 'User phone number',
    required: true,
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR', { message: 'Phone number is not valid' })
  phone: string;
}
