import User from "../models/User";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest{
    user_id:string;
    name:string;
}

class EditUserService{
    private usersRepository: IUserRepository;

    constructor(usersRepository:IUserRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({user_id, name}:IRequest): Promise <User | undefined> {
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User is not exists');
        }

        await this.usersRepository.edit(user_id, name);

        const newUser = await this.usersRepository.findByUserId(user_id);

        return newUser;
    }
}

export default EditUserService;
