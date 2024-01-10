import { IsNotEmpty, IsString } from 'class-validator';

export class SendOtpDto {
  @IsNotEmpty()
  @IsString()
  username: string;
}
