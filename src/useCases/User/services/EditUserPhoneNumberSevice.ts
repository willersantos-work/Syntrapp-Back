import User from "../models/User";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest{
    user_id:string;
    phone_number:string;
}

class EditUserPhoneNumberService{
    private usersRepository: IUserRepository;

    constructor(usersRepository:IUserRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({user_id, phone_number}:IRequest): Promise <User | undefined> {
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User is not exists');
        }

        await this.usersRepository.editPhoneNumber(user_id, phone_number);

        const newUser = await this.usersRepository.findByUserId(user_id);

        return newUser;
    }
}

export default EditUserPhoneNumberService;
