import Router from 'express';
import farmRoutes from './Farm/routes';
import answerRoutes from './Answer/routes';
import questionsRoutes from './Piu/routes';
import userRoutes from './User/routes/index';
import workersRoutes from './Worker/routes';
import articleTextRoutes from './Article_Text/routes';
import spaceRoutes from './Space/routes';
import videosRoutes from './Video/routes';
import safSpacesRoutes from './SAF_Space/routes';
import patternPlantRoutes from './Pattern_Plant/routes';
import documentsRoutes from './Document/routes';

const routes = Router();

routes.use('/answer', answerRoutes);
routes.use('/question', questionsRoutes);
routes.use('/worker', workersRoutes);
routes.use(userRoutes);
routes.use('/farm', farmRoutes);
routes.use('/space', spaceRoutes);
routes.use('/SAF_space', safSpacesRoutes)
routes.use('/article_text', articleTextRoutes);
routes.use('/video', videosRoutes);
routes.use('pattern_plant', patternPlantRoutes);
routes.use('/document', documentsRoutes);

export default routes;
