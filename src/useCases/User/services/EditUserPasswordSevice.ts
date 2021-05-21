import auth from "../../../config/auth";
import User from "../models/User";
import IUserRepository from "../repositories/IUserRepository";
import { sign } from 'jsonwebtoken';
import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";

interface IRequest{
    user_id:string;
    password:string;
    confirm_password:string;
    old_password:string;
}

class EditUserPasswordService{
    private usersRepository: IUserRepository;
    private hashProvider: IHashProvider;

    constructor(usersRepository:IUserRepository, hashProvider: IHashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({user_id, password, confirm_password, old_password}:IRequest): Promise <User | undefined> {
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User is not exists');
        }

        if (confirm_password!=old_password) {
            throw new Error('Password is not egual the Confirm Password!');
        }

        const password_matched = await this.hashProvider.compareHash(old_password, user.password);

        if (!password_matched) {
            throw new Error('Password is incorrect');
        }

        const senha = /^[0-9a-zA-Z$*&@#]{8,}$/

        if(!senha.test(password)) {
            throw new Error('New Password is very short, password contain less than 8 chars');
        }

        const hashPassword = await this.hashProvider.generateHash(password);

        await this.usersRepository.editPassword(user_id, hashPassword);

        const newUser = await this.usersRepository.findByUserId(user_id);

        return newUser;
    }
}

export default EditUserPasswordService;
