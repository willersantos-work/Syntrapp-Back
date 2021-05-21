import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";
import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import Worker from "../models/Worker";
import IWorkerRepository from "../repositories/IWorkerRepository";

interface IRequest{
    email:string;
    name:string;
    CPF:string;
    password:string;
    phone_number:string;
    user_id:string;
}

class CreateWorkerService{
    private workersRepository: IWorkerRepository;
    private hashProvider: IHashProvider;
    private usersRepository: IUserRepository;

    constructor(workersRepository: IWorkerRepository, usersRepository: IUserRepository, hashProvider: IHashProvider) {
        this.workersRepository = workersRepository;
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }

    public async execute({name, CPF, password, phone_number, email, user_id}:IRequest): Promise <{worker:Worker, user:User | undefined}> {
        // Verificar se o usuário é válido
        // Verificar se username worker ja existe
        // Verificar se email worker ja existe
        // Fazer hash da senha
        // Criar e salvar um Worker
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User is not inside the program')
        }

        const testEmail = /^(?=.*[@])(?=.*[.])[0-9a-zA-Z@._]{3,}$/

        if(!testEmail.test(email)) {
            throw new Error('Email Invalid');
        }

        const emailUsed = await this.workersRepository.findByEmail(email);

        if (emailUsed) {
            throw new Error('E-mail already used');
        }

        const testCPF = /^[0-9]{11}$/

        if(!testCPF.test(CPF)) {
            throw new Error('CPF Invalid');
        }

        const CPF_exist = await this.workersRepository.findByCPF(CPF);

        if (CPF_exist) {
            throw new Error('CPF already used');
        }

        const senha = /^[0-9a-zA-Z$*&@#]{8,}$/

        if(!senha.test(password)) {
            throw new Error('Password is very short, password contain less than 8 chars');
        }

        const hashPassword = await this.hashProvider.generateHash(password);

        const worker = await this.workersRepository.create({
            email,
            name,
            CPF,
            password: hashPassword,
            phone_number,
            user_id
        })

        await this.workersRepository.save(worker);

        return {worker, user};
    }
}

export default CreateWorkerService;
