import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import { ModuleNotification } from "./shares/enum/ModuleNotification";

@Entity()
export class Notifications {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  email?: string;

  @Column()
  phone!: number;

  @Column({
    type: "enum",
    enum: ModuleNotification,
    default: ModuleNotification.CONSULTING,
  })
  module?: ModuleNotification;

  @Column("text")
  content!: string;

  @Column({ default: false })
  isRead!: boolean;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
