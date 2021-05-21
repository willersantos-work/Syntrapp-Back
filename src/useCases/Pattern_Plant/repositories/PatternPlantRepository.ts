import { getRepository, Repository } from "typeorm";
import CreatePatternPlantDTO from "../dtos/CreatePatternPlantsDTO";
import PatternPlant from "../models/PatternPlant";
import IPatternPlantRepository from "./IPatternPlantRepository";

class PatternPlantRepository implements IPatternPlantRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<PatternPlant>;

    constructor() {
        this.ormRepository = getRepository(PatternPlant);
    }

    public async create(data:CreatePatternPlantDTO): Promise<PatternPlant> {
        const pattern_plant = this.ormRepository.create(data);

        return pattern_plant;
    }

    public async save(data:PatternPlant): Promise<PatternPlant> {
        const pattern_plant = await this.ormRepository.save(data)

        return pattern_plant;
    }

    public async delete(plant_name:string, user_id:string): Promise<string> {
        const pattern_plant = await this.ormRepository.findOneOrFail({
            where: {plant_name, user_id}
        });

        const {plant_class} = pattern_plant;

        await this.ormRepository.delete({
            plant_name, plant_class, user_id,
        });

        return plant_name;
    }

    public async saveSetup(pattern_plants:PatternPlant[], user_id:string): Promise<PatternPlant[]> {
        // const função = () => {
            // await this.ormRepository.save();
        // }
        const new_pattern_plants: (PatternPlant[]) = [];
        const thisRepository = this.ormRepository;

        pattern_plants.map( async function(pattern_plant) {
            const {plant_name, plant_class} = pattern_plant;
            const pattern_plant_data = await thisRepository.create({plant_name, plant_class, user_id});
            const pattern_plant_created = await thisRepository.save(pattern_plant_data);
            new_pattern_plants.push(pattern_plant_created);
        });

        return new_pattern_plants;
    }
}

export default PatternPlantRepository;
