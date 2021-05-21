import { Request, Response } from 'express';
import FarmsRepository from '../../../useCases/Farm/repositories/FarmRepository';
import CreateFarmService from '../../../useCases/Farm/services/CreateFarmService';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

//Cadastro da farms
class FarmsController {
    public async create(request:Request,response:Response){
        const {farm_name} = request.body;
        const authHeader = request.headers.authorization;
        const { id: user_id } = request.user;


        if (!authHeader) {
            throw new Error('JWT Token is missing');
        }

        const [, token] = authHeader.split(' ');

        const farmsRepository = new FarmsRepository();
        const usersRepository = new UsersRepository();

        const createFarm = new CreateFarmService(farmsRepository, usersRepository);

        const { farm, user } = await createFarm.execute({ farm_name, user_id });

        return response.json({farm, user, token});
    }
};

export default FarmsController;
