import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";
import { sign } from 'jsonwebtoken';
import auth from "../../../config/auth";
import IWorkerRepository from "../repositories/IWorkerRepository";
import Worker from '.././models/Worker';

interface IRequest{
    email: string;
    password: string;
}

class AutenticateWorkerService{
    private workerRepository: IWorkerRepository;
    private hashProvider: IHashProvider;

    constructor(workerRepository:IWorkerRepository, hashProvider:IHashProvider) {
        this.workerRepository = workerRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({email, password}: IRequest): Promise<{User_used:Worker | undefined, token:string}>{
        //Verificar se o usuário existe
        const User_used = await this.workerRepository.findByEmail(email);

        if (!User_used) {
            throw new Error('E-mail does not exists');
        }

        const state_free = User_used.isState;

        if (state_free==false) {
            throw new Error('Worker is desactivated of the system');
        }

        //Verificar se a senha é compatível ao usuário
        const password_matched = await this.hashProvider.compareHash(password, User_used.password);

        if (!password_matched) {
            throw new Error('Password is incorrect');
        }

        const { secret, expiresIn } = auth.jwt;

        //Gerar um token de autenticação
        const token = sign({}, secret, {
            subject: User_used.id, //Id do usuário
            expiresIn //Em quanto tempo expira
        })

        return { User_used, token };
    }
}

export default AutenticateWorkerService;
