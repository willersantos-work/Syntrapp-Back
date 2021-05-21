import { Request, Response } from 'express';
import HashProvider from '../../../shared/Providers/HashProvider/HashProvider';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';
import WorkerSearchProfileService from '../../../useCases/User/services/WorkerSearchProfileService';
import WorkersRepository from '../../../useCases/Worker/repositories/WorkerRepository';
import CreateWorkerService from '../../../useCases/Worker/services/CreateWorkerService';
import EditStateWorkerService from '../../../useCases/Worker/services/IsStateWorkerService';

class WorkersController {
    public async create(request:Request,response:Response){
        const {name, CPF, password, phone_number, email} = request.body;
        const {id: user_id} = request.user;

        const usersRepository = new UsersRepository();
        const workersRepository = new WorkersRepository();
        const hashProvider = new HashProvider();

        const createWorker = new CreateWorkerService(workersRepository, usersRepository, hashProvider);

        const { worker, user } = await createWorker.execute({ name, CPF, password, phone_number, email, user_id });

        return response.json({worker, user});
    }

    public async index(request:Request,response:Response){
        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();
        const searchProfile = new WorkerSearchProfileService(usersRepository);

        const user_with_workers = await searchProfile.execute({ user_id });

        return response.json({user_with_workers});
    }

    public async edit(request:Request,response:Response){
        const { worker_id, isState } = request.body;

        const workersRepository = new WorkersRepository();
        const editState = new EditStateWorkerService(workersRepository);

        const newWorker = await editState.execute({ worker_id, isState });

        return response.json({newWorker});
    }
};

export default WorkersController;
