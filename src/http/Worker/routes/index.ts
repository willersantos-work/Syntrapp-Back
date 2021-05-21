import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import ProfileWorkerController from '../controller/profileWorkerController';
import SectionsWorkerController from '../controller/sectionWorkersController';
import WorkersController from '../controller/workersController';

const workersController = new WorkersController();
const sectionsWorkerController = new SectionsWorkerController();
const profileWorkerController = new ProfileWorkerController();

const workersRoutes = Router();

workersRoutes.post('/createWorker', ensureAuthenticated, workersController.create);
workersRoutes.post('/login',sectionsWorkerController.create)
workersRoutes.get('/profile', ensureAuthenticated, profileWorkerController.show);
workersRoutes.get('/allWorkers', ensureAuthenticated, workersController.index);
workersRoutes.patch('/editState', ensureAuthenticated, workersController.edit);

export default workersRoutes;
