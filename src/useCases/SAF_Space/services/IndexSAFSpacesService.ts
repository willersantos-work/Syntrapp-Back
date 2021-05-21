import Space from "../../Space/models/Space";
import ISpaceRepository from "../../Space/repositories/ISpaceRepository";
import SAFSpace from "../models/SAFSpace";

interface IRequest{
    space_id:string;
}

class IndexSAFSpaceService{
    private spaceRepository: ISpaceRepository;

    constructor(spaceRepository: ISpaceRepository) {
        this.spaceRepository = spaceRepository;
    }

    public async execute({space_id}:IRequest): Promise <{space:Space,saf_spaces:SAFSpace[]}> {
        // Verificar se o SAF Space é válido
        // Retornar o SAF Space

        const space = await this.spaceRepository.findBySpaceId(space_id);

        if (!space) {
            throw new Error('Space does not exist')
        }

        const saf_spaces = await this.spaceRepository.seeAllSAFSpaces(space_id);

        return {space, saf_spaces};
    }
}

export default IndexSAFSpaceService;
