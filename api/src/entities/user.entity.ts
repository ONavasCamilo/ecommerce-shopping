import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Role } from "./role.entity";

@Entity({
    name: "users",
})
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "varchar",
        length: 30,
        nullable: false,
    })
    name: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type: "text",
    })
    address: string;

    @Column()
    phone: string;

    @Column({
        type: "varchar",
        length: 100,
        nullable: false,
        select: false,
    })
    password: string;

    @OneToMany(() => Order, (order) => order.user)
    @JoinColumn({ name: "order_id" })
    orders: Order[]

    @ManyToOne(() => Role, (role) => role.user, {
        cascade: true,
    })
    role: Role;
}