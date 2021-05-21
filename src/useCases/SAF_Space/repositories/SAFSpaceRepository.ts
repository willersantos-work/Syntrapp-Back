import { getRepository, Repository } from "typeorm";
import CreateSAFSpaceDTO from "../dtos/CreateSAFSpaceDTO";
import SAFSpace from "../models/SAFSpace";
import ISAFSpaceRepository from "./ISAFSpaceRepository";

class SAFSpaceRepository implements ISAFSpaceRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<SAFSpace>;

    constructor() {
        this.ormRepository = getRepository(SAFSpace);
    }

    public async create(data:CreateSAFSpaceDTO): Promise<SAFSpace> {
        const saf_space = this.ormRepository.create(data);

        return saf_space;
    }

    public async save(data:SAFSpace): Promise<SAFSpace> {
        const saf_space = await this.ormRepository.save(data)

        return saf_space;
    }

    public async edit(data:CreateSAFSpaceDTO,saf_space_id:string): Promise<any> {
        const saf_space = await this.ormRepository.update({id:saf_space_id}, data)

        return saf_space;
    }

    public async delete(saf_space_id:string): Promise<string> {
        const saf_space = await this.ormRepository.findOneOrFail({
            where: {id: saf_space_id}
        });

        const {id, space_id, name, area, lines_quantity, width_line, width_interline, created_at, updated_at} = saf_space;

        await this.ormRepository.delete({
            id, space_id, name, area, lines_quantity, width_line, width_interline, created_at, updated_at,
        });

        return saf_space_id;
    }

    public async findBySAFSpaceId(saf_space_id:string): Promise<SAFSpace | undefined> {
        const saf_space = await this.ormRepository.findOne({
            where: {id: saf_space_id}
        });

        return saf_space;
    }
}

export default SAFSpaceRepository;
