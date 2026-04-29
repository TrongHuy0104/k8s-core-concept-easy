import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('catalog_items')
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    sku: string;

    @Column()
    title: string;
}
