import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import ArticleTextsController from '.././controller/articleTextsController';
import ArticleTextsFilterController from '../controller/articleTextsFilterController';

const articleTextsController = new ArticleTextsController();
const articleTextsFilterController = new ArticleTextsFilterController();

const articleTextRoutes = Router();

articleTextRoutes.post('/create', ensureAuthenticated, articleTextsController.create);
articleTextRoutes.get('/seeAllSearched', articleTextsFilterController.index);
articleTextRoutes.get('/seeAll', articleTextsController.index);

export default articleTextRoutes;
