import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./User";

export enum Currency {
  EUR = "EUR",
  USD = "USD",
  RON = "RON"
}

@Entity({ name: "product" })
export class Product {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  title: string;

  @Column("longtext", {nullable: true})
  description: string;

  @ManyToOne(() => User, user => user.products)
  owner: User;

  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.EUR
  })
  currency: string;

  @Column({type: 'decimal', nullable: true})
  price: number;

  @CreateDateColumn({
    precision: null,
    type: "datetime",
    default: () => 'CURRENT_TIMESTAMP'
  })
  created_at: Date;

  @UpdateDateColumn({
    precision: null,
    type: "datetime",
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  constructor(title: string, owner: User, price: number, currency: string, description?: string) {
    this.title = title;
    this.owner = owner;
    this.price = price;
    this.currency = currency;
    this.description = description;
  }
}
