import IUserRepository from "../../User/repositories/IUserRepository";
import PatternPlant from "../models/PatternPlant";

interface IRequest{
    user_id:string;
}

class IndexPatternPlantService{
    private usersRepository: IUserRepository;

    constructor(usersRepository: IUserRepository) {
        this.usersRepository = usersRepository;
    }

    public async execute({user_id}:IRequest): Promise <PatternPlant[]> {
        // Verificar se o user é válido
        // Criar e salvar um PatternPlant
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        const pattern_plants = await this.usersRepository.findByUserIdWithPatternPlants(user_id);

        return pattern_plants;
    }
}

export default IndexPatternPlantService;
