import { Module } from '@nestjs/common';
import { Redis } from 'ioredis';

@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: async () => {
        const client = new Redis({
          host: 'localhost',
          port: 6379,
        });

        return client;
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
