// src/entity/ToDo.ts

import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity
export class ToDo {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column()
    title!: string;
    @Column()
    description!: string;
    @Column({default: false})
    finished!: boolean;
    @ManyToOne(() => User, (user) => user.todos, {onDelete: 'CASCADE'})
    user!: User;
}