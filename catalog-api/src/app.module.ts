import { Module } from '@nestjs/common';
import { HealthzModule } from './healthz/healthz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './catalog/item.entity';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    CatalogModule, HealthzModule, TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'postgres-service.default.svc.cluster.local',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'postgres',
      entities: [Item],
      autoLoadEntities: true,
      synchronize: true,
    })
  ],
})
export class AppModule {}
