import CreatePatternPlantDTO from "../dtos/CreatePatternPlantsDTO";
import PatternPlant from "../models/PatternPlant";

interface IPatternPlantRepository{
    create(data:CreatePatternPlantDTO): Promise<PatternPlant>;
    save(data:PatternPlant): Promise<PatternPlant>;
    saveSetup(pattern_plants:PatternPlant[], user_id:string): Promise<PatternPlant[]>;
    delete(plant_name:string, user_id:string): Promise<string>;
}

export default IPatternPlantRepository;
