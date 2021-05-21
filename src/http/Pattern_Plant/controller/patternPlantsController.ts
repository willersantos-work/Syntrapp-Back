import { Request, Response } from 'express';
import PatternPlantRepository from '../../../useCases/Pattern_Plant/repositories/PatternPlantRepository';
import CreatePatternPlantService from '../../../useCases/Pattern_Plant/services/CreatePatternPlantService';
import IndexPatternPlantService from '../../../useCases/Pattern_Plant/services/IndexPatternPlantService';
import RemovePatternPlantService from '../../../useCases/Pattern_Plant/services/RemovePatternPlantService';
import UserRepository from '../../../useCases/User/repositories/UserRepository';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

class PatternPlantsController {
    public async create(request:Request,response:Response){
        const {plant_name, plant_class} = request.body;
        const {id:user_id} = request.user;

        const patternPlantsRepository = new PatternPlantRepository();
        const usersRepository = new UserRepository();

        const createPatternPlant = new CreatePatternPlantService(patternPlantsRepository, usersRepository);

        const pattern_plant = await createPatternPlant.execute({plant_name, plant_class, user_id});

        return response.json({pattern_plant});
    }

    public async index(request:Request,response:Response){
        const {id:user_id} = request.user;

        const usersRepository = new UsersRepository();

        const indexPatternPlant = new IndexPatternPlantService(usersRepository);

        const pattern_plants = await indexPatternPlant.execute({user_id});

        return response.json({pattern_plants});
    }

    public async delete(request:Request,response:Response){
        const {plant_name} = request.params;
        const {id:user_id} = request.user;

        const patternPlantsRepository = new PatternPlantRepository();
        const usersRepository = new UsersRepository();

        const removePatternPlant = new RemovePatternPlantService(patternPlantsRepository, usersRepository);

        const {user,plant} = await removePatternPlant.execute({plant_name, user_id});

        return response.json({user,plant});
    }

};

export default PatternPlantsController;
