import { Request, Response } from 'express';
import AutenticateWorkerService from '../../../useCases/Worker/services/AutenticateWorkerService';
import WorkersRepository from '../../.././useCases/Worker/repositories/WorkerRepository';
import HashProvider from '../../.././shared/Providers/HashProvider/HashProvider';

class SectionsWorkerController {
    public async create(request:Request,response:Response){
        const {email, password} = request.body;

        const workersRepository = new WorkersRepository();
        const hashProvider = new HashProvider();
        const autenticateWorker = new AutenticateWorkerService(workersRepository, hashProvider);

        const { emailExist, token } = await autenticateWorker.execute({ email, password });

        return response.json({emailExist, token});
    }
};

export default SectionsWorkerController;
