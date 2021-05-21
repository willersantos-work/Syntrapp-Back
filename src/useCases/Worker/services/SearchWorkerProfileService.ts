import IWorkerRepository from "../repositories/IWorkerRepository";

interface IRequest{
    user_id:string;
}

class SearchWorkerProfileService{
    private workerRepository: IWorkerRepository;

    constructor(workerRepository: IWorkerRepository) {
        this.workerRepository = workerRepository;
    }

    public async execute({user_id}:IRequest): Promise <Worker> {
        // Verificar se o usuário é válido
        // Retornar infos do usuário
        const worker = await this.workerRepository.findByWorkerId(user_id);

        if (!worker) {
            throw new Error('User not found')
        }

        return worker;
    }
}

export default SearchWorkerProfileService;
