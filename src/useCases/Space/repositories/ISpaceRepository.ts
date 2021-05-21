import SAFSpace from "../../SAF_Space/models/SAFSpace";
import CreateSpaceDTO from "../dtos/CreateSpaceDTO";
import Space from "../models/Space";

interface ISpaceRepository{
    create(data:CreateSpaceDTO): Promise<Space>;
    save(data:Space): Promise<Space>;
    edit(data:CreateSpaceDTO,space_id:string): Promise<any>;
    findBySpaceId(space_id:string): Promise<Space | undefined>;
    seeAllSAFSpaces(space_id:string): Promise<SAFSpace[]>;
}

export default ISpaceRepository;
