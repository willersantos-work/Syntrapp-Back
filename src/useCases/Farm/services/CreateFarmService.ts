import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import Farm from "../models/Farm";
import IFarmRepository from "../repositories/IFarmRepository";

interface IRequest{
    farm_name:string;
    user_id:string;
}

class CreateFarmService{
    private farmsRepository: IFarmRepository;
    private usersRepository: IUserRepository;

    constructor(farmsRepository:IFarmRepository, usersRepository: IUserRepository) {
        this.farmsRepository = farmsRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({farm_name, user_id}:IRequest): Promise <{farm:Farm, user:User | undefined}> {
        // Verificar se o usuário é válido
        // Verificar se content não é vazio
        // Criar e salvar um Piu
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        const farm_exists = await this.farmsRepository.findByFarmName(farm_name);

        if (farm_exists){
            throw new Error('Farm Name already exists')
        }

        const farm = await this.farmsRepository.create({
            farm_name,
            user_id
        })

        await this.farmsRepository.save(farm);

        return {farm, user};
    }
}

export default CreateFarmService;
