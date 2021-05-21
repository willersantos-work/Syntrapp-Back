import CreateSAFSpaceDTO from "../dtos/CreateSAFSpaceDTO";
import SAFSpace from "../models/SAFSpace";

interface ISAFSpaceRepository{
    create(data:CreateSAFSpaceDTO): Promise<SAFSpace>;
    save(data:SAFSpace): Promise<SAFSpace>;
    edit(data:CreateSAFSpaceDTO,saf_space_id:string): Promise<any>;
    delete(saf_space_id:string): Promise<string>;
    findBySAFSpaceId(saf_space_id:string): Promise<SAFSpace | undefined>;
}

export default ISAFSpaceRepository;
