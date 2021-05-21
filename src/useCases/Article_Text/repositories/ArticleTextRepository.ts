import { getRepository, Repository } from 'typeorm';
import CreateArticleTextDTO from "../dtos/CreateArticleTextDTO";
import ArticleText from "../models/ArticleText";
import IArticleTextRepository from './IArticleTextRepository';

class ArticleTextRepository implements IArticleTextRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<ArticleText>;

    constructor() {
        this.ormRepository = getRepository(ArticleText);
    }

    public async create(data:CreateArticleTextDTO): Promise<ArticleText> {
        const articleTexts = this.ormRepository.create(data);

        return articleTexts;
    }

    public async save(data:ArticleText): Promise<ArticleText> {
        const articleTexts = await this.ormRepository.save(data)

        return articleTexts;
    }

    public async seeAll(): Promise<ArticleText[]> {
        const articleTexts = await this.ormRepository.find({
            select: (['id', 'author', 'about', 'text', 'created_at']),
            order: {created_at:"DESC"}
        })

        return articleTexts;
    }
}

export default ArticleTextRepository;
