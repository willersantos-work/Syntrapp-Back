import { getRepository, Repository } from "typeorm";
import CreateFarmDTO from "../dtos/CreateFarmDTO";
import Farm from "../models/Farm";
import IFarmRepository from "./IFarmRepository";

class FarmsRepository implements IFarmRepository {
    private ormRepository: Repository<Farm>;

    constructor() {
        this.ormRepository = getRepository(Farm);
    }

    public async findByFarmName(farm_name: string): Promise<Farm | undefined> {
        const farm = this.ormRepository.findOne({
            where: { farm_name },
        });

        return farm;
    }

    public async create(data: CreateFarmDTO): Promise<Farm> {
        const farm = this.ormRepository.create(data);

        return farm;
    }

    public async save(data: Farm): Promise<Farm> {
        const farm = await this.ormRepository.save(data);

        return farm;
    }

    public async findSpaceByFarmId(farm_id: string): Promise<Farm> {
        const spaceWithFarm = await this.ormRepository.findOneOrFail({
            where: { id: farm_id },
            relations: ["space"],
        });

        return spaceWithFarm;
    }

    public async findByFarmId(farm_id: string): Promise<Farm | undefined> {
        const farm = await this.ormRepository.findOne({
            where: { id: farm_id },
        });

        return farm;
    }
}

export default FarmsRepository;
