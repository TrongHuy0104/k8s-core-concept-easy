import { Module } from '@nestjs/common';
import { HealthzController } from './healthz.controller';
import { RedisModule } from "../redis/redis.module";

@Module({
    imports: [RedisModule],
    controllers: [HealthzController]
})
export class HealthzModule {}
