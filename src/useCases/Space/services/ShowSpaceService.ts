import IFarmRepository from "../../Farm/repositories/IFarmRepository";
import Space from "../models/Space";


interface IRequest{
    farm_id:string;
}

class SearchProfileService{
    private farmsRepository: IFarmRepository;

    constructor(farmsRepository: IFarmRepository) {
        this.farmsRepository = farmsRepository;
    }

    public async execute({farm_id}:IRequest): Promise <Space> {
        // Verificar se o usuário é válido
        // Retornar infos do usuário
        const farm = await this.farmsRepository.findSpaceByFarmId(farm_id);

        if (!farm) {
            throw new Error('Farm does not exist')
        }

        const {space} = farm;

        return space;
    }
}

export default SearchProfileService;
