import CreateFarmDTO from "../dtos/CreateFarmDTO";
import Farm from "../models/Farm";

interface IFarmRepository{
    findByFarmName(farm_name:string): Promise<Farm | undefined>;
    create(data:CreateFarmDTO): Promise<Farm>;
    save(data:Farm): Promise<Farm>;
    findSpaceByFarmId(farm_id:string): Promise<Farm>;
    findByFarmId(farm_id:string): Promise<Farm | undefined>;
}

export default IFarmRepository;
