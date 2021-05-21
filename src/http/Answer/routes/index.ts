import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import AnswerController from '../controller/answerController';

const answerController = new AnswerController();

const answerRoutes = Router();

answerRoutes.post('/create', ensureAuthenticated, answerController.create);

export default answerRoutes;
