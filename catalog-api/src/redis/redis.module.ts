import { Global, Module } from '@nestjs/common';
import Redis from 'ioredis';

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {

                const client = new Redis({
                    host: process.env.REDIS_HOST || 'redis-service.default.svc.cluster.local',
                    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
                });

                client.on('connect', () => {
                    console.log('Connected to Redis via Kubernetes DNS');
                });

                client.on('error', (err) => {
                    console.error('Redis connection error:', err);
                });

                return client;
            },
        },
    ],
    exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
