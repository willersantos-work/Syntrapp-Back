import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";

interface IRequest{
    user_id:string;
}

class SearchProfileService{
    private usersRepository: IUserRepository;

    constructor(usersRepository: IUserRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({user_id}:IRequest): Promise <{user: User}> {
        // Verificar se o usuário é válido
        // Retornar infos do usuário
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        //const user_with_pius = await this.usersRepository.findByUserId(user_id);
        //const pius = await this.piusRepository.index(user_id);

        return {user};
    }
}

export default SearchProfileService;
