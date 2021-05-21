import { Request, Response } from 'express';
import WorkerRepository from '../../../useCases/Worker/repositories/WorkerRepository';
import SearchWorkerProfileService from '../../../useCases/Worker/services/SearchWorkerProfileService';

class ProfileWorkerController {
    public async show(request:Request,response:Response){
        const { id: user_id } = request.user;

        const workersRepository = new WorkerRepository();
        const searchProfile = new SearchWorkerProfileService(workersRepository);

        const worker = await searchProfile.execute({ user_id });

        return response.json({worker});
    }
};

export default ProfileWorkerController;
