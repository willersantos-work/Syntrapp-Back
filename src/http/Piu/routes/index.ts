import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import QuestionsController from '../controller/piusController';

const questionsController = new QuestionsController();

const questionsRoutes = Router();

questionsRoutes.post('/postar', ensureAuthenticated, questionsController.create);
questionsRoutes.get('/see/:id', ensureAuthenticated, questionsController.show);

export default questionsRoutes;
