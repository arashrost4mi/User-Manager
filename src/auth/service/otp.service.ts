import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import * as otplib from 'otplib';

@Injectable()
export class OtpService {
  constructor(private readonly redisClient: Redis) {}
  async generateOtp(secret: string): Promise<number> {
    const otp = parseInt(await otplib.authenticator.generate(secret));
    return otp;
  }
}
