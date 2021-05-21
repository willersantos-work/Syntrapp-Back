import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import Answer from '../../Answer/models/Answer';
import User from '../../User/models/User';

@Entity('questions')
class Question{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    author:string;

    @Column()
    about:string;

    @Column()
    text:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Question;
