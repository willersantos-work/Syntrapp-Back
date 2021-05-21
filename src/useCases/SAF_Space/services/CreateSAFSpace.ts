import Space from "../../Space/models/Space";
import ISpaceRepository from "../../Space/repositories/ISpaceRepository";
import SAFSpace from "../models/SAFSpace";
import ISAFSpaceRepository from "../repositories/ISAFSpaceRepository";

interface IRequest{
    space_id: string;
    name: string;
    area: number;
    lines_quantity: string;
    width_line: number;
    width_interline: number;
}

class CreateSAFSpaceService{
    private saf_spacesRepository: ISAFSpaceRepository;
    private spaceRepository: ISpaceRepository;

    constructor(saf_spacesRepository: ISAFSpaceRepository, spaceRepository: ISpaceRepository) {
        this.saf_spacesRepository = saf_spacesRepository;
        this.spaceRepository = spaceRepository;
    }

    public async execute({space_id, name, area, lines_quantity, width_line, width_interline}:IRequest): Promise <{space:Space, saf_space:SAFSpace}> {
        // Verificar se o space é válido
        // Criar e salvar um SAFSpace
        const space = await this.spaceRepository.findBySpaceId(space_id);

        if (!space) {
            throw new Error('Space not found')
        }

        const saf_space = await this.saf_spacesRepository.create({
            space_id,
            name,
            area,
            lines_quantity,
            width_line,
            width_interline
        })

        await this.saf_spacesRepository.save(saf_space);

        return {space,saf_space};
    }
}

export default CreateSAFSpaceService;
