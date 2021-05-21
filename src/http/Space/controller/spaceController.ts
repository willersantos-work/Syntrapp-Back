import { Request, Response } from 'express';
import FarmsRepository from '../../../useCases/Farm/repositories/FarmRepository';
import SpaceRepository from '../../../useCases/Space/repositories/SpaceRepository';
import CreateSpaceService from '../../../useCases/Space/services/CreateSpaceService';
import EditSpaceService from '../../../useCases/Space/services/EditSpaceService';
import ShowSpaceService from '../../../useCases/Space/services/ShowSpaceService';

class SpaceController {
    public async create(request:Request,response:Response){
        const {farm_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity} = request.body;

        const spaceRepository = new SpaceRepository();
        const farmsRepository = new FarmsRepository();

        const createSpace = new CreateSpaceService(spaceRepository, farmsRepository);

        const { space, farm } = await createSpace.execute({farm_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity});

        return response.json({space, farm});
    }

    public async show(request:Request,response:Response){
        const {farm_id} = request.body;

        const farmsRepository = new FarmsRepository();

        const showSpace = new ShowSpaceService(farmsRepository);

        const space = await showSpace.execute({farm_id});

    }

    public async edit(request:Request,response:Response){
        const {id:space_id} = request.params;
        const {position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity} = request.body;

        const spaceRepository = new SpaceRepository();

        const editSpace = new EditSpaceService(spaceRepository);

        const space = await editSpace.execute({space_id, position_x_general, position_y_general, type, figures_quantities, position_x_specific, position_y_specific, width, length, climate, water_proximity});;

        return response.json({space});
    }
};

export default SpaceController;
