import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import Redis from 'ioredis';

const CACHE_KEY = 'catalog:items';
const CACHE_TTL = 60;

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Item) private readonly itemRepo: Repository<Item>,
        @Inject('REDIS_CLIENT') private readonly redis: Redis,
    ) {}

    async create(sku: string, title: string) {
        const item = this.itemRepo.create({ sku, title });
        const saved = await this.itemRepo.save(item);
        await this.redis.del(CACHE_KEY);
        return saved;
    }

    async findAll() {
        const cached = await this.redis.get(CACHE_KEY);
        if (cached) {
            return { items: JSON.parse(cached), cacheHit: true };
        }
        const items = await this.itemRepo.find();
        await this.redis.set(CACHE_KEY, JSON.stringify(items), 'EX', CACHE_TTL);
        return { items, cacheHit: false };
    }
}
