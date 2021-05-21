import { Request, Response } from 'express';
import SAFSpaceRepository from '../../../useCases/SAF_Space/repositories/SAFSpaceRepository';
import CreateSAFSpaceService from '../../../useCases/SAF_Space/services/CreateSAFSpace';
import DeleteSAFSpaceService from '../../../useCases/SAF_Space/services/DeleteSAFSpaceService';
import EditSAFSpaceService from '../../../useCases/SAF_Space/services/EditSAFSpaceService';
import IndexSAFSpaceService from '../../../useCases/SAF_Space/services/IndexSAFSpacesService';
import ShowSAFSpaceService from '../../../useCases/SAF_Space/services/ShowSAFSpaceService';
import SpaceRepository from '../../../useCases/Space/repositories/SpaceRepository';

class SAFSpacesController {
    public async create(request:Request,response:Response){
        const {space_id, name, area, lines_quantity, width_line, width_interline} = request.body;

        const saf_spacesRepository = new SAFSpaceRepository();
        const spaceRepository = new SpaceRepository();

        const createSAFSpace = new CreateSAFSpaceService(saf_spacesRepository, spaceRepository);

        const {space,saf_space} = await createSAFSpace.execute({space_id, name, area, lines_quantity, width_line, width_interline});

        return response.json({space,saf_space});
    }

    public async show(request:Request,response:Response){
        const {id:saf_space_id} = request.params;

        const saf_spacesRepository = new SAFSpaceRepository();

        const showSAFSpace = new ShowSAFSpaceService(saf_spacesRepository);

        const saf_space = await showSAFSpace.execute({saf_space_id});

        return response.json({saf_space});
    }

    public async index(request:Request,response:Response){
        const {space_id} = request.body;

        const spaceRepository = new SpaceRepository();

        const showAllSAFSpace = new IndexSAFSpaceService(spaceRepository);

        const {space,saf_spaces} = await showAllSAFSpace.execute({space_id});

        return response.json({space,saf_spaces});
    }

    public async edit(request:Request,response:Response){
        const {saf_space_id} = request.params;
        const {name, area, lines_quantity, width_line, width_interline} = request.body;

        const saf_spacesRepository = new SAFSpaceRepository();

        const editSAFSpace = new EditSAFSpaceService(saf_spacesRepository);

        const saf_space = await editSAFSpace.execute({saf_space_id, name, area, lines_quantity, width_line, width_interline});

        return response.json({saf_space});
    }

    public async delete(request:Request,response:Response){
        const {saf_space_id} = request.params;

        const saf_spacesRepository = new SAFSpaceRepository();

        const deleteSAFSpace = new DeleteSAFSpaceService(saf_spacesRepository);

        const saf_space_id_deleted = await deleteSAFSpace.execute({saf_space_id});

        return response.json({saf_space_id_deleted});
    }

};

export default SAFSpacesController;
