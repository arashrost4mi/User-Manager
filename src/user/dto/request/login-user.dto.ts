import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Username',
    example: 'arash',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'Ab120000',
    minLength: 8,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password is not strong enough. It must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.',
  })
  password: string;
}
