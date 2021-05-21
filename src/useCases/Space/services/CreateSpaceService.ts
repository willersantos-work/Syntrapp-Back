import Farm from "../../Farm/models/Farm";
import IFarmRepository from "../../Farm/repositories/IFarmRepository";
import Space from "../models/Space";
import ISpaceRepository from "../repositories/ISpaceRepository";

interface IRequest{
    farm_id:string;
    position_x_general:string;
    position_y_general:string;
    type:number;
    figures_quantities:number;
    position_x_specific:number;
    position_y_specific:number;
    width:number;
    length:number;
    climate:string;
    water_proximity:number;
}

class CreateSpaceService{
    private spaceRepository: ISpaceRepository;
    private farmsRepository: IFarmRepository;

    constructor(spaceRepository: ISpaceRepository, farmsRepository: IFarmRepository) {
        this.spaceRepository = spaceRepository;
        this.farmsRepository = farmsRepository;
    }

    public async execute({farm_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity}:IRequest): Promise <{space:Space, farm:Farm}> {
        // Verificar se a farm é válida
        // Criar e salvar um Space
        const farm = await this.farmsRepository.findByFarmId(farm_id);

        if (!farm) {
            throw new Error('Farm not found')
        }

        const space = await this.spaceRepository.create({
            farm_id,
            position_x_general,
            position_y_general,
            type,
            figures_quantities,
            position_x_specific,
            position_y_specific,
            width,
            length,
            climate,
            water_proximity
        })

        await this.spaceRepository.save(space);

        return {space,farm};
    }
}

export default CreateSpaceService;
