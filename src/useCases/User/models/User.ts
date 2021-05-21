import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import ArticleText from '../../Article_Text/models/ArticleText';
import Farm from '../../Farm/models/Farm';
import PatternPlant from '../../Pattern_Plant/models/PatternPlant';
import Question from '../../Piu/models/Piu';
import Video from '../../Video/models/Video';
import Worker from '../../Worker/models/Worker';

@Entity('users')
class User{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    //Para geração do id
    @Column()
    email:string;
    //Para geração da string
    @Column()
    name:string;

    @Column()
    CPF:string;

    @Column()
    avatar:string;

    @Column()
    phone_number:string;

    @Column()
    password:string;

    @OneToMany(() => ArticleText, article_text => article_text.user)
    article_texts: ArticleText[];

    @OneToMany(() => Question, question => question.user)
    questions: Question[];

    @OneToMany(() => Worker, worker => worker.user)
    workers: Worker[];

    @OneToMany(() => Video, video => video.user)
    videos: Video[];

    @OneToMany(() => Farm, farm => farm.user)
    farms: Farm[];

    @OneToMany(() => PatternPlant, pattern_plant => pattern_plant.user)
    pattern_plants: PatternPlant[];

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;
}

export default User;

//Ver sqlites e mongus, decorator do typeorm é muito mais legível
