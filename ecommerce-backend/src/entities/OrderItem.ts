import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
  order!: Order;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: "CASCADE",
  })
  product!: Product;

  @Column("decimal", { precision: 10, scale: 2 })
  price!: number;

  @Column()
  quantity!: number;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
