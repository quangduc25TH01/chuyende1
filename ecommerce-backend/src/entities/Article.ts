import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ArticleCategories } from "./shares/enum/Article";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ unique: true })
  slug!: string;

  @Column({ type: "enum", enum: ArticleCategories })
  category!: ArticleCategories;

  @Column()
  thumbnail!: string;

  @Column({ type: "text" })
  content!: string;

  @Column({ default: false })
  isPublished!: boolean;

  @Column({ default: false })
  isRemoved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;
}
