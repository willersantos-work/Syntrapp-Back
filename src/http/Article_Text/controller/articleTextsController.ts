import { Request, Response } from 'express';
import ArticleTextRepository from '../../../useCases/Article_Text/repositories/ArticleTextRepository';
import CreateArticleTextService from '../../../useCases/Article_Text/services/CreateArticleTextService';
import ShowArticleTextService from '../../../useCases/Article_Text/services/ShowArticleTextService';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

class ArticleTextsController {
    //Criação de articles
    public async create(request:Request,response:Response){
        const {about, text} = request.body;
        const { id: user_id } = request.user;

        const articleTextsRepository = new ArticleTextRepository();
        const usersRepository = new UsersRepository();

        const createArticleText = new CreateArticleTextService(articleTextsRepository, usersRepository);

        const { article_text, user } = await createArticleText.execute({ about, text, user_id });

        return response.json({article_text, user});
    }

    //Mostra todos os artigos
    public async index(request:Request,response:Response){
        const articleTextsRepository = new ArticleTextRepository();

        const showArticleText = new ShowArticleTextService(articleTextsRepository);

        const article_text = await showArticleText.execute({});

        return response.json(article_text);
    }
};

export default ArticleTextsController;
