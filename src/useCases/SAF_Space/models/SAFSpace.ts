import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Space from "../../Space/models/Space";

@Entity('SAF_Spaces')
class SAFSpace{
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    space_id: string;

    @Column()
    name: string;

    @Column()
    area: number;

    @Column()
    lines_quantity: string;

    @Column()
    width_line: number;

    @Column()
    width_interline: number;

    @ManyToOne(() => Space)
    @JoinColumn({ name: 'space_id'})
    space: Space;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default SAFSpace;
