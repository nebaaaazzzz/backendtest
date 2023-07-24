import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    type: "json",
  })
  value: {
    data: any[];
    images: any[];
  } = { data: [], images: [] };

  @CreateDateColumn()
  createdAt: Date = new Date(); // Creation date

  @UpdateDateColumn()
  updatedAt: Date = new Date();
}
