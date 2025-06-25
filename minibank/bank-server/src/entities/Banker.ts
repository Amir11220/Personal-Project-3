import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, UpdateDateColumn } from "typeorm";
import {Personal} from './utils/Personal';
import { Customer } from "./Customer";


type Address = {
    address: string;
    city: string;
    password: string;
    postCode: number;
};

@Entity('banker')
export class Banker extends Personal {

    @Column({ type: 'json', nullable: true })
    address!: Address;

    @Column({unique: true, length: 10})
    employee_number!: string;

    @ManyToMany(() => Customer, {
        cascade: true,
    })
    @JoinTable({
        name: 'banker_customer',
        joinColumn: {
            name: 'banker',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'customer',
            referencedColumnName: 'id'
        }
    })
    customer!: Customer[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
