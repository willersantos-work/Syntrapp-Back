import PatternPlant from '../../Pattern_Plant/models/PatternPlant';
import User from '.././models/User';
import CreateUserDTO from '../dtos/CreateUserDTO';

interface IUserRepository{
    findByEmail(email:string): Promise<User | undefined>;
    findByCPF(CPF:string): Promise<User | undefined>;
    findByUserId(user_id:string): Promise<User | undefined>;
    findByNameUser(user_id:string): Promise<string>;
    findByIdWithQuestions(user_id:string): Promise<User | undefined>;
    findByIdWithWorkers(user_id:string): Promise<User>;
    findByUserIdWithPatternPlants(user_id:string): Promise<PatternPlant[]>;
    create(data:CreateUserDTO): Promise<User>;
    save(data:User): Promise<User>;
    edit(user_id:string, name:string): Promise<any>;
    editPhoneNumber(user_id:string, phone_number:string): Promise<any>;
    editPassword(user_id:string, new_password:string): Promise<any>;
    dontShowPassword(user_id:string): Promise<User>;
}

export default IUserRepository;
