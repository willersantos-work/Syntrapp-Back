import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../../User/models/User';

@Entity('workers')
class Worker{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    email:string;

    @Column()
    name:string;

    @Column()
    CPF:string;

    @Column()
    password:string;

    @Column()
    phone_number:string;

    @Column()
    avatar:string;

    @Column()
    user_id:string;

    @Column()
    isState:boolean;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Worker;
