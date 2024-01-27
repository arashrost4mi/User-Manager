import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginOtpDto {
  @ApiProperty({
    example: 'arash',
    description: 'username',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: '1234',
    description: 'otp',
  })
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
