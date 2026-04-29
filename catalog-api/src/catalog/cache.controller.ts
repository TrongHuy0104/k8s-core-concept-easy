import { Controller, Get, Post, Body, Res, HttpCode } from '@nestjs/common';
import type { Response } from 'express';
import { CatalogService } from './catalog.service';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Post('items')
    @HttpCode(201)
    async create(@Body() body: { sku: string; title: string }) {
        const item = await this.catalogService.create(body.sku, body.title);
        return item;
    }

    @Get('items')
    async findAll(@Res() res: Response) {
        const { items, cacheHit } = await this.catalogService.findAll();
        res.setHeader('X-Cache', cacheHit ? 'HIT' : 'MISS');
        return res.json(items);
    }
}
