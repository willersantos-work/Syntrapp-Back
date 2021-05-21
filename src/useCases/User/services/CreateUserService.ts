import IHashProvider from "../../../shared/Providers/HashProvider/IHashProvider";
import User from "../models/User";
import IUserRepository from "../repositories/IUserRepository";
import { sign } from 'jsonwebtoken';
import auth from "../../../config/auth";
import IPatternPlantRepository from "../../Pattern_Plant/repositories/IPatternPlantRepository";
import PatternPlant from "../../Pattern_Plant/models/PatternPlant";

interface IRequest{
    name:string;
    email:string;
    CPF:string;
    password:string;
    phone_number:string;
}

class CreateUserService{
    private usersRepository: IUserRepository;
    private hashProvider: IHashProvider;
    private patternPlantsRepository: IPatternPlantRepository;

    constructor(usersRepository:IUserRepository, hashProvider:IHashProvider, patternPlantsRepository: IPatternPlantRepository) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
        this.patternPlantsRepository = patternPlantsRepository;
    }

    public async execute({name, email, CPF, password, phone_number}:IRequest): Promise <{user:User, token:string, patternPlantsSetup:PatternPlant[]}> {
        //ver se o email é único
        //ver se o username é único
        //precisa fazer um "hash" com a senha do usuário
        //retornar um token
        //Gerar o padrão de plantas

        // erro aqui em userRepository.findByEmail

        const testEmail = /^(?=.*[@])(?=.*[.])[0-9a-zA-Z@._]{3,}$/

        if(!testEmail.test(email)) {
            throw new Error('Email Invalid');
        }

        const emailUsed = await this.usersRepository.findByEmail(email);

        if (emailUsed) {
            throw new Error('E-mail already used');
            //Precisa cancelar o request
        }

        const testCPF = /^[0-9]{11}$/

        if(!testCPF.test(CPF)) {
            throw new Error('CPF Invalid');
        }

        const CPFUsed = await this.usersRepository.findByCPF(CPF);

        if (CPFUsed) {
            throw new Error('CPF already used');
        }

        const senha = /^[0-9a-zA-Z$*&@#]{8,}$/
        /*(?=.*\d)              // deve conter ao menos um dígito
        (?=.*[a-z])           // deve conter ao menos uma letra minúscula
        (?=.*[A-Z])           // deve conter ao menos uma letra maiúscula
        (?=.*[$*&@#])         // deve conter ao menos um caractere especial
        [0-9a-zA-Z$*&@#]{8,}  // deve conter ao menos 8 dos caracteres mencionados*/

        if(!senha.test(password)) {
            throw new Error('Password is very short, password contain less than 8 chars');
        }

        const hashPassword = await this.hashProvider.generateHash(password);

        const new_user = await this.usersRepository.create({
            email,
            name,
            password: hashPassword,
            CPF,
            phone_number
        })

        await this.usersRepository.save(new_user);

        const {id:user_id} = new_user;

        const user = await this.usersRepository.dontShowPassword(user_id);

        const emailExist = await this.usersRepository.findByEmail(email);

        if (!emailExist) {
            throw new Error('E-mail does not exists');
        }

        const { secret, expiresIn} = auth.jwt;

        const token = sign({}, secret, {
            subject: emailExist.id, //Id do usuário
            expiresIn //Em quanto tempo expira
        })

        const patternPlants = await this.usersRepository.findByUserIdWithPatternPlants('00000000-0000-0000-0000-000000000000');

        await this.patternPlantsRepository.saveSetup(patternPlants, user_id);

        const patternPlantsSetup = await this.usersRepository.findByUserIdWithPatternPlants(user_id);

        return {user, token, patternPlantsSetup};
    }
}

export default CreateUserService;
