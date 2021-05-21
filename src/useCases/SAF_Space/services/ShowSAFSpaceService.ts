import SAFSpace from "../models/SAFSpace";
import ISAFSpaceRepository from "../repositories/ISAFSpaceRepository";

interface IRequest{
    saf_space_id:string;
}

class ShowSAFSpaceService{
    private saf_spaceRepository: ISAFSpaceRepository;

    constructor(saf_spaceRepository: ISAFSpaceRepository) {
        this.saf_spaceRepository = saf_spaceRepository;
    }

    public async execute({saf_space_id}:IRequest): Promise <SAFSpace> {
        // Verificar se o SAF Space é válido
        // Retornar o SAF Space

        const saf_space = await this.saf_spaceRepository.findBySAFSpaceId(saf_space_id);

        if (!saf_space) {
            throw new Error('SAF Space does not exist')
        }

        return saf_space;
    }
}

export default ShowSAFSpaceService;
