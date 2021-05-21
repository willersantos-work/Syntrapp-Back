import SAFSpace from "../models/SAFSpace";
import ISAFSpaceRepository from "../repositories/ISAFSpaceRepository";

interface IRequest{
    saf_space_id:string;
    name: string;
    area: number;
    lines_quantity: string;
    width_line: number;
    width_interline: number;
}

class EditSAFSpaceService{
    private saf_spaceRepository: ISAFSpaceRepository;

    constructor(saf_spaceRepository: ISAFSpaceRepository) {
        this.saf_spaceRepository = saf_spaceRepository;
    }

    public async execute({saf_space_id, name, area, lines_quantity, width_line, width_interline}:IRequest): Promise <SAFSpace> {
        // Verificar se a safSpace é válida
        // Retirar o space_id
        // Editar os dados do safSpace
        // Retornar safSpace
        const saf_space = await this.saf_spaceRepository.findBySAFSpaceId(saf_space_id);

        if (!saf_space) {
            throw new Error('SAF Space does not exist')
        }

        const {space_id} = saf_space;

        const data = {space_id, name, area, lines_quantity, width_line, width_interline};

        await this.saf_spaceRepository.edit(
            data,
            space_id
        )

        const newSAFSpace = await this.saf_spaceRepository.findBySAFSpaceId(saf_space_id);

        if (!newSAFSpace) {
            throw new Error('Space does not exist')
        }

        return newSAFSpace;
    }
}

export default EditSAFSpaceService;
