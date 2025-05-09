import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Category } from "./Category";
import { ProductImage } from "./ProductImage";
import { Review } from "./Review";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  code!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  slug!: string;

  @Column("text")
  description!: string;

  @Column("text")
  information!: string;

  @Column({ default: false })
  isNew!: boolean;

  @Column({ default: false })
  isBestSeller!: boolean;

  @ManyToOne(() => Category, (category: Category) => category.products)
  category!: Category;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  images!: ProductImage[];

  @OneToMany(() => Review, (rev) => rev.product)
  reviews!: Review[];

  @Column({ default: false })
  isRemoved!: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems!: OrderItem[];

  @Column({ default: 0 })
  price!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
