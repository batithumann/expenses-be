import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'account' })
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  balance: number;

  @Column({ nullable: false })
  name: string;
}