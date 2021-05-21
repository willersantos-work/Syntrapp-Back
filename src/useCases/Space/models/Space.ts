import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import Farm from '../../Farm/models/Farm';
import SAFSpace from '../../SAF_Space/models/SAFSpace';

@Entity('space')
class Space{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    farm_id:string;

    @Column()
    position_x_general:string;

    @Column()
    position_y_general:string;

    @Column()
    type:number;

    @Column()
    figures_quantities:number;

    @Column()
    position_x_specific:number;

    @Column()
    position_y_specific:number;

    @Column()
    width:number;

    @Column()
    length:number;

    @Column()
    climate:string;

    @Column()
    water_proximity:number;

    @OneToOne(() => Farm, farm => farm.space)
    farm: Farm;

    @OneToMany(() => SAFSpace, saf_Space => saf_Space.space)
    saf_Spaces: SAFSpace[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default Space;
