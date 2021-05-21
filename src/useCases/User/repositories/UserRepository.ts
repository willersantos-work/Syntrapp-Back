import { getRepository, Repository } from 'typeorm';
import IUserRepository from './IUserRepository';
import User from '.././models/User';
import CreateUserDTO from '../dtos/CreateUserDTO';
import PatternPlant from '../../Pattern_Plant/models/PatternPlant';

class UsersRepository implements IUserRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByEmail(email:string): Promise<User | undefined>{
        const user = await this.ormRepository.findOne({
            where: {email}
            //{email:email}, mas é igual então não precisa
        });
        //Vários métodos para encontrar algum filtro do usuário
        return user;
    }

    public async findByCPF(CPF:string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {CPF}
            //{email:email}, mas é igual então não precisa
        });
        //Vários métodos para encontrar algum filtro do usuário

        return user;

    }

    public async findByUserId(user_id:string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {id: user_id}
        });

        return user;
    }

    public async dontShowPassword(user_id:string): Promise<User> {
        const user = await this.ormRepository.findOneOrFail({
            where: {id: user_id}
        });

        const {id, email, name, CPF, avatar, phone_number, password, article_texts, questions, workers, videos, farms, pattern_plants, created_at, updated_at} = user;
        const find_user = {id, email, name, CPF, avatar, phone_number, password:'', article_texts, questions, workers, videos, farms, pattern_plants, created_at, updated_at};

        return find_user;
    }

    public async findByNameUser(user_id:string): Promise<string> {
        const user = await this.ormRepository.findOneOrFail({
            where: {id: user_id},
            select: (['name'])
        });

        const { name } = user;


        return name;
    }

    public async findByIdWithQuestions(user_id:string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {id: user_id},
            relations: ['questions'],
        });

        return user;
    }

    public async findByUserIdWithPatternPlants(user_id:string): Promise<PatternPlant[]> {
        const user = await this.ormRepository.findOneOrFail({
            where: {id: user_id},
            relations: ['pattern_plants'],
        });

        const { pattern_plants } = user;

        return pattern_plants;
    }

    public async findByIdWithWorkers(user_id: string): Promise<User> {
        const user = await this.ormRepository.findOneOrFail({
            where: {id: user_id},
            relations: ['workers'],
        });

        return user;
    }

    public async create(data: CreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(data);

        return user;
    }

    public async save(data: User): Promise<User> {
        const user = await this.ormRepository.save(data)

        return user;
    }

    public async edit(user_id:string, name:string): Promise<any> {
        const user = await this.ormRepository.update(user_id, {name:name})

        return user;
    }

    public async editPhoneNumber(user_id:string, phone_number:string): Promise<any> {
        const user = await this.ormRepository.update(user_id, {phone_number:phone_number})

        return user;
    }

    public async editPassword(user_id:string, new_password:string): Promise<any> {
        const user = await this.ormRepository.update(user_id, {password:new_password})

        return user;
    }
}

export default UsersRepository;
