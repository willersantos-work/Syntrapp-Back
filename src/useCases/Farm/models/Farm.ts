import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import Space from '../../Space/models/Space';
import User from '../../User/models/User';

@Entity('farms')
class Farm{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    farm_name:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;

    @OneToOne(() => Space, space => space.farm)
    space: Space;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Farm;
