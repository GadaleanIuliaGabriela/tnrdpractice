import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({nullable: false})
  username: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: false})
  email: string;

  @Column({nullable: false})
  status: string;

  @Column({nullable: true, length: 255})
  activation_token: string;

  @Column({nullable: true, length: 255})
  auth_token: string

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

  constructor(username: string, password: string, status: string, activation_token?: string) {
    this.username = username;
    this.password = password;
    this.email = username;
    this.status = status;
    this.activation_token = activation_token;
  }
}
