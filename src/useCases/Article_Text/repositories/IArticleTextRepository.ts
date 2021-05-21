import CreateArticleTextDTO from "../dtos/CreateArticleTextDTO";
import ArticleText from "../models/ArticleText";

interface IArticleTextRepository{
    create(data:CreateArticleTextDTO): Promise<ArticleText>;
    save(data:ArticleText): Promise<ArticleText>;
    seeAll(): Promise<ArticleText[]>;
}

export default IArticleTextRepository;
