import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AuthRepository {
  constructor(private readonly redisClient: Redis) {}

  async getOtp(username: string) {
    try {
      return this.redisClient.get(username);
    } catch (err) {
      throw new Error(err);
    }
  }

  async setOtp(username: string, otp: number) {
    try {
      return this.redisClient.set(username, otp, 'EX', 60 * 5);
    } catch (err) {
      throw new Error(err);
    }
  }

  async remainingTimeOtp(username: string) {
    try {
      return this.redisClient.ttl(username);
    } catch (err) {
      throw new Error(err);
    }
  }
}
