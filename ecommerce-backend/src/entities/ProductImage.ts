import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductImage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  imageUrl!: string;

  @ManyToOne(() => Product, (product) => product.images)
  product!: Product;

  @Column({
    default: false,
  })
  isRemoved!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
