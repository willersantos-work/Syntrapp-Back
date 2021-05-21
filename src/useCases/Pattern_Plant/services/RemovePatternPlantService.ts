import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import IPatternPlantRepository from "../repositories/IPatternPlantRepository";

interface IRequest{
    plant_name:string;
    user_id:string;
}

class RemovePatternPlantService{
    private patternPlantsRepository: IPatternPlantRepository;
    private usersRepository: IUserRepository;

    constructor(patternPlantsRepository: IPatternPlantRepository, usersRepository: IUserRepository) {
        this.patternPlantsRepository = patternPlantsRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({plant_name, user_id}:IRequest): Promise <{user:User, plant:string}> {
        // Verificar se o user é válido
        // Remover um PatternPlant por plant name e user id
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        const plant = await this.patternPlantsRepository.delete(plant_name, user_id);

        return {user, plant};
    }
}

export default RemovePatternPlantService;
