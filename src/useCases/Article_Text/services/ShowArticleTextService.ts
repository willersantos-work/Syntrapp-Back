import ArticleText from "../models/ArticleText";
import IArticleTextRepository from "../repositories/IArticleTextRepository";

interface IRequest{}

class ShowArticleTextService{
    private articleTextsRepository: IArticleTextRepository;

    constructor(articleTextsRepository:IArticleTextRepository) {
        this.articleTextsRepository = articleTextsRepository;
    }

    public async execute({}:IRequest): Promise <ArticleText[]> {
        // Verificar se o usuário é válido
        // Ordenar por datas recentes de postagem
        const article_text = await this.articleTextsRepository.seeAll();

        return article_text;
    }
}

export default ShowArticleTextService;
