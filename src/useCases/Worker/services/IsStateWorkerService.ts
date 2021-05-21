import Worker from "../models/Worker";
import IWorkerRepository from "../repositories/IWorkerRepository";

interface IRequest{
    worker_id:string;
    isState:boolean;
}

class EditStateWorkerService{
    private workersRepository: IWorkerRepository;

    constructor(workersRepository:IWorkerRepository) {
        this.workersRepository = workersRepository;
    }

    public async execute({worker_id, isState}:IRequest): Promise <any> {
        const worker = await this.workersRepository.findByWorkerId(worker_id);

        if (!worker) {
            throw new Error('User is not exists');
        }

        const newWorker = await this.workersRepository.editState(worker_id, isState);

        return newWorker;
    }
}

export default EditStateWorkerService;
