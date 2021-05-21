import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";
import { sign } from 'jsonwebtoken';
import auth from "../../../config/auth";
import IFarmRepository from "../repositories/IFarmRepository";
import IUserRepository from "../../User/repositories/IUserRepository";
import User from "../../User/models/User";
import Farm from "../models/Farm";

interface IRequest{
    email: string;
    password: string;
    farm_name:string;
}

class AutenticateUserWithFarmService{
    private usersRepository: IUserRepository;
    private farmsRepository: IFarmRepository;
    private hashProvider: IHashProvider;

    constructor(usersRepository:IUserRepository, farmsRepository: IFarmRepository, hashProvider:IHashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.farmsRepository = farmsRepository;
    }

    public async execute({email, password, farm_name}: IRequest): Promise<{user:User | undefined, token:string, farm:Farm}>{
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new Error('E-mail does not exists');
        }

        const password_matched = await this.hashProvider.compareHash(password, user.password);

        if (!password_matched) {
            throw new Error('Password is incorrect');
        }

        const { secret, expiresIn} = auth.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        })

        const farm = await this.farmsRepository.findByFarmName(farm_name);

        if (!farm) {
            throw new Error('Farm does not exists');
        }

        return { user, token, farm };
    }
}

export default AutenticateUserWithFarmService;