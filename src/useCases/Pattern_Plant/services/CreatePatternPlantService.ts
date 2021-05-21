import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import PatternPlant from "../models/PatternPlant";
import IPatternPlantRepository from "../repositories/IPatternPlantRepository";

interface IRequest{
    plant_name:string;
    plant_class:string;
    user_id:string;
}

class CreatePatternPlantService{
    private patternPlantsRepository: IPatternPlantRepository;
    private usersRepository: IUserRepository;

    constructor(patternPlantsRepository: IPatternPlantRepository, usersRepository: IUserRepository) {
        this.patternPlantsRepository = patternPlantsRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({plant_name, plant_class, user_id}:IRequest): Promise <{user:User, pattern_plant:PatternPlant}> {
        // Verificar se o user é válido
        // Criar e salvar um PatternPlant
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        const pattern_plant = await this.patternPlantsRepository.create({
            plant_name,
            plant_class,
            user_id
        })

        await this.patternPlantsRepository.save(pattern_plant);

        return {user, pattern_plant};
    }
}

export default CreatePatternPlantService;
