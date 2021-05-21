interface CreateSpaceDTO{
    farm_id:string;
    position_x_general:string;
    position_y_general:string;
    type:number;
    figures_quantities:number;
    position_x_specific:number;
    position_y_specific:number;
    width:number;
    length:number;
    climate:string;
    water_proximity:number;
}

export default CreateSpaceDTO;
