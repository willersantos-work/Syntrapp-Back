import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import User from "../../User/models/User";

@Entity('pattern_plants')
class PatternPlant{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    plant_name:string;

    @Column()
    plant_class:string;

    @Column()
    user_id:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id'})
    user: User;
}

export default PatternPlant;
