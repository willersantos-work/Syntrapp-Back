import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import User from '../../User/models/User';

@Entity('videos')
class Video{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    about:string;

    @Column()
    video:string;

    @Column()
    author:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Video;
