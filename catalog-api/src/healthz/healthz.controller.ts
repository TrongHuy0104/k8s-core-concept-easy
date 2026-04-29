import { Controller, Get, Inject } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { DataSource } from 'typeorm';

@Controller('/health')
export class HealthzController {
    constructor(
        @Inject('REDIS_CLIENT') private readonly redisClient: Redis,
        @InjectDataSource() private readonly dataSource: DataSource,
    ) {}

    @Get()
    async check() {
        let redis = 'ok';
        let postgres = 'ok';

        try {
            await this.redisClient.ping()
        } catch (error) {
            redis = "error"
        }

        try {
            await this.dataSource.query("SELECT 1")
        } catch (error) {
            postgres = "error"
        }

        return {
            postgres,
            redis
        }
    }
}
