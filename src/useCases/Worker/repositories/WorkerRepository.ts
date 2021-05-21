import { getRepository, Repository } from 'typeorm';
import CreateWorkerDTO from '../dtos/CreateWorkerDTO';
import Worker from '../models/Worker';
import IWorkerRepository from './IWorkerRepository';

class WorkersRepository implements IWorkerRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Worker>;

    constructor() {
        this.ormRepository = getRepository(Worker);
    }

    public async findByEmail(email:string): Promise<Worker | undefined>{
        const worker = await this.ormRepository.findOne({
            where: {email}
        });
        return worker;
    }

    public async findByCPF(username:string): Promise<Worker | undefined> {
        const worker = await this.ormRepository.findOne({
            where: {username}
        });

        return worker;
    }

    public async findByWorkerId(user_id:string): Promise<Worker | undefined> {
        const worker = await this.ormRepository.findOne({
            where: {id: user_id}
        });

        return worker;
    }

    public async create(data: CreateWorkerDTO): Promise<Worker> {
        const workers = this.ormRepository.create(data);

        return workers;
    }

    public async save(data: Worker): Promise<Worker> {
        const workers = await this.ormRepository.save(data)

        return workers;
    }

    public async editState(worker_id:string, isState:boolean): Promise<any> {
        await this.ormRepository.update({id: worker_id}, {isState: isState})
        const newWorker = await this.ormRepository.findOne({
            where: {id: worker_id}
        });

        return newWorker;
    }
}

export default WorkersRepository;
