import CreateWorkerDTO from "../dtos/CreateWorkerDTO";
import Worker from "../models/Worker";

interface IWorkerRepository{
    findByEmail(email:string): Promise<Worker | undefined>;
    findByCPF(CPF:string): Promise<Worker | undefined>;
    findByWorkerId(user_id:string): Promise<Worker | undefined>;
    create(data:CreateWorkerDTO): Promise<Worker>;
    save(data:Worker): Promise<Worker>;
    editState(worker_id:string, isState:boolean): Promise<any>;
}

export default IWorkerRepository;
