import { Router } from "express";
import ensureAuthenticated from "../../../shared/middlewares/ensureAutheticated";
import PatternPlantsController from "../controller/patternPlantsController";

const patternPlantsController = new PatternPlantsController();

const patternPlantRoutes = Router();

patternPlantRoutes.post('/newPattern', ensureAuthenticated, patternPlantsController.create);
patternPlantRoutes.post('/remove', ensureAuthenticated, patternPlantsController.delete);
patternPlantRoutes.get('/seeAll', ensureAuthenticated, patternPlantsController.index);

export default patternPlantRoutes;
