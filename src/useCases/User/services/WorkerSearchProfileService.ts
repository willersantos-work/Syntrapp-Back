import IUserRepository from "../../User/repositories/IUserRepository";
import User from '../models/User';

interface IRequest{
    user_id:string;
}

class WorkerSearchProfileService{
    private usersRepository: IUserRepository;

    constructor(usersRepository: IUserRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({user_id}:IRequest): Promise <User> {
        // Verificar se o usuário está logado
        // Verificar se o usuário é válido
        // Buscar trabalhadores do usuário pelo user_id
        // Retornar trabalhadores do usuário

        const userLogin = await this.usersRepository.findByUserId(user_id);

        if (!userLogin) {
            throw new Error('User is not inside the program')
        }

        const user_with_workers = await this.usersRepository.findByIdWithWorkers(user_id);

        return user_with_workers;
    }
}

export default WorkerSearchProfileService;
