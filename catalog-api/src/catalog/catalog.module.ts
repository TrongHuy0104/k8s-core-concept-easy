import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './item.entity';
import { RedisModule } from '../redis/redis.module';
import { CatalogController } from './cache.controller';
import { CatalogService } from './catalog.service';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), RedisModule],
    controllers: [CatalogController],
    providers: [CatalogService],
})
export class CatalogModule {}
