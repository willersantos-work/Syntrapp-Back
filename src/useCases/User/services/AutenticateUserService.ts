import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";
import { sign } from 'jsonwebtoken';
import IUserRepository from "../repositories/IUserRepository";
import auth from "../../../config/auth";
import User from "../models/User";

interface IRequest{
    email: string;
    password: string;
}

class AutenticateUserService{
    private usersRepository: IUserRepository;
    private hashProvider: IHashProvider;

    constructor(usersRepository:IUserRepository, hashProvider:IHashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({email, password}: IRequest): Promise<{user:User, token:string}>{
        //Verificar se o usuário existe
        const verficated_user = await this.usersRepository.findByEmail(email);

        if (!verficated_user) {
            throw new Error('E-mail does not exists');
        }

        //Verificar se a senha é compatível ao usuário
        const password_matched = await this.hashProvider.compareHash(password, verficated_user.password);

        if (!password_matched) {
            throw new Error('Password is incorrect');
        }

        const { secret, expiresIn } = auth.jwt;

        //Gerar um token de autenticação
        const token = sign({}, secret, {
            subject: verficated_user.id, //Id do usuário
            expiresIn //Em quanto tempo expira
        })

        const user = await this.usersRepository.dontShowPassword(verficated_user.id);

        return { user, token };
    }
}

export default AutenticateUserService;
