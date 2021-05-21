import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import FarmsController from '.././controller/farmsController';
import SectionFarmsController from '.././controller/sectionsFarmsController';

const sectionFarmController = new SectionFarmsController();
const farmsController = new FarmsController();

const farmRoutes = Router();

farmRoutes.post('/login', sectionFarmController.create);
farmRoutes.post('/register', ensureAuthenticated, farmsController.create);

export default farmRoutes;