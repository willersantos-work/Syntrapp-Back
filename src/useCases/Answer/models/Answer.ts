import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Question from '../../Piu/models/Piu';

@Entity('answers')
class Answer{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    question_id:string;

    @Column()
    answer_text:string;

    @Column()
    author:string;

    @Column()
    user_id:string;

    @ManyToOne(() => Question)
    @JoinColumn({ name: 'question_id'})
    question: Question;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Answer;
