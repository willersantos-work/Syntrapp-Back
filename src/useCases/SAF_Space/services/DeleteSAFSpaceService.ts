import ISAFSpaceRepository from "../repositories/ISAFSpaceRepository";

interface IRequest{
    saf_space_id:string;
}

class DeleteSAFSpaceService{
    private saf_spaceRepository: ISAFSpaceRepository;

    constructor(saf_spaceRepository: ISAFSpaceRepository) {
        this.saf_spaceRepository = saf_spaceRepository;
    }

    public async execute({saf_space_id}:IRequest): Promise <string> {
        // Verificar se o SAF Space é válido
        // Deletar o saf_space
        // Retornar o saf_space_id

        const saf_space = await this.saf_spaceRepository.findBySAFSpaceId(saf_space_id);

        if (!saf_space) {
            throw new Error('SAF Space does not exist')
        }

        await this.saf_spaceRepository.delete(
            saf_space_id
        )

        return saf_space_id;
    }
}

export default DeleteSAFSpaceService;
