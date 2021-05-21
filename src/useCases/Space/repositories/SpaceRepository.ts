import { getRepository, Repository } from "typeorm";
import SAFSpace from "../../SAF_Space/models/SAFSpace";
import CreateSpaceDTO from "../dtos/CreateSpaceDTO";
import Space from "../models/Space";
import ISpaceRepository from "./ISpaceRepository";

class SpaceRepository implements ISpaceRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Space>;

    constructor() {
        this.ormRepository = getRepository(Space);
    }

    public async create(data:CreateSpaceDTO): Promise<Space> {
        const space = this.ormRepository.create(data);

        return space;
    }

    public async save(data:Space): Promise<Space> {
        const space = await this.ormRepository.save(data)

        return space;
    }

    public async edit(data:CreateSpaceDTO,space_id:string): Promise<any> {
        const space = await this.ormRepository.update({id:space_id}, data)

        return space;
    }

    public async findBySpaceId(space_id:string): Promise<Space | undefined> {
        const space = await this.ormRepository.findOne({
            where: {id:space_id}
        })

        return space;
    }

    public async seeAllSAFSpaces(space_id:string): Promise<SAFSpace[]> {
        const space = await this.ormRepository.findOneOrFail({
            where: {id: space_id},
            relations: ['SAF_Spaces'],
        });

        const {saf_Spaces} = space;

        return saf_Spaces;
    }
}

export default SpaceRepository;
