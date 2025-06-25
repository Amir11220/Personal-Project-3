import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";



@Entity('Personal')
export class Personal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column ({unique: true, length: 15})
    card_number!: string;

}
