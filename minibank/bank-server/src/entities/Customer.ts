import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, UpdateDateColumn } from "typeorm";
import { Transaction } from "./Transaction";
import {Personal} from './utils/Personal';
import { Banker } from "./Banker";

type Info = {
    age: number;
    hair_color: string;
};

type Address = {
    address: string;
    city: string;
    password: string;
    postCode: number;
};

@Entity()
export class Customer extends Personal {

    @Column({type: 'numeric', default: 0})
    balance!: number

    @Column({ type: 'json', nullable: true })
    info!: Info;

    @Column({ type: 'json', nullable: true })
    address!: Address;

    @Column({ type: 'json',  default: []})
    family_members!: string[];

    @OneToMany(() => Transaction, transaction => transaction.Customer, {
    onDelete: "CASCADE"
    })
    @JoinColumn({name: 'customer_transaction'})
    transactions!: Transaction[];

    @ManyToMany(() => Banker, {
    cascade: true,
    })
    bankers!: Banker[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
