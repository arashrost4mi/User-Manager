import {
  IsString,
  IsNotEmpty,
  MinLength,
  Matches,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message:
      'Password is not strong enough. It must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({ require_tld: true }, { message: 'Email is not valid' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('IR', { message: 'Phone number is not valid' })
  phone: string;
}
