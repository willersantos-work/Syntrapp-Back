import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "../../User/models/User";

@Entity('documents')
class Document{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    document:string;

    @Column()
    type:string;

    @Column()
    task_id:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @ManyToOne(() => Task)
    @JoinColumn({ name: 'task_id'})
    tasks: Task;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Document;
