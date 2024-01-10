import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginOtpDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
