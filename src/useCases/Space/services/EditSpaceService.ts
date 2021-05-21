import Space from "../models/Space";
import ISpaceRepository from "../repositories/ISpaceRepository";

interface IRequest{
    space_id:string;
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

class EditSpaceService{
    private spaceRepository: ISpaceRepository;

    constructor(spaceRepository: ISpaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    public async execute({space_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity}:IRequest): Promise <Space> {
        // Verificar se a farm é válida
        // Criar e salvar um Space
        const space = await this.spaceRepository.findBySpaceId(space_id);

        if (!space) {
            throw new Error('Space does not exist')
        }

        const {farm_id} = space;

        const data = {farm_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity};

        await this.spaceRepository.edit(
            data,
            space_id
        )

        const newSpace = await this.spaceRepository.findBySpaceId(space_id);

        if (!newSpace) {
            throw new Error('Space does not exist')
        }

        return newSpace;
    }
}

export default EditSpaceService;
