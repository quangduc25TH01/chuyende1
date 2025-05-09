import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column('text', { nullable: true })
  comment?: string;

  @Column({ type: 'int', default: 5 })
  rating!: number;

  @Column({ default: false })
  isRemoved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Product, (product) => product.reviews)
  product!: Product;
}
