import { Request, Response } from 'express';
import HashProvider from '../../../shared/Providers/HashProvider/HashProvider';
import FarmsRepository from '../../../useCases/Farm/repositories/FarmRepository';
import AutenticateUserWithFarmService from '../../../useCases/Farm/services/AutenticateUserWithFarmService';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

//Login das farms
class SectionFarmsController {
    public async create(request:Request,response:Response){
        const { farm_name, email, password } = request.body;

        const usersRepository = new UsersRepository();
        const farmsRepository = new FarmsRepository();
        const hashProvider = new HashProvider();
        const autenticateUser = new AutenticateUserWithFarmService(usersRepository, farmsRepository, hashProvider );

        const { user, token, farm } = await autenticateUser.execute({ email, password, farm_name });

        return response.json({user, farm, token});
    }
};

export default SectionFarmsController;
