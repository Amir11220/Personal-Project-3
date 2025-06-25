import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Customer } from "./Customer";


export enum TransactionType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw'
}

@Entity('Transaction')
export class Transaction extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "enum", enum: TransactionType })
    type!: TransactionType;

    @Column({ type: "numeric" })
    amount!: number;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;


    @ManyToOne(() => Customer, customer => customer.transactions, {
    onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'customer_id'})
    Customer!: Customer;
}
