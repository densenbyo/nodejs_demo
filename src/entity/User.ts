// src/entity/User.ts
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ToDo} from "./ToDo";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    username!: string;
    @Column()
    password!: string;
    @Column()
    email!: string;
    @OneToMany(() => ToDo, (todo) => todo.user, {cascade: true})
    todos!: ToDo[];
}