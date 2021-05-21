import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import ArticleText from "../models/ArticleText";
import IArticleTextRepository from "../repositories/IArticleTextRepository";

interface IRequest{
    about:string;
    text:string;
    user_id:string;
}

class CreateArticleTextService{
    private articleTextsRepository: IArticleTextRepository;
    private usersRepository: IUserRepository;

    constructor(articleTextsRepository:IArticleTextRepository, usersRepository: IUserRepository) {
        this.articleTextsRepository = articleTextsRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({about, text, user_id}:IRequest): Promise <{article_text:ArticleText, user:User | undefined}> {
        // Verificar se o usuário é válido
        // Verificar se about não é vazio
        // Verificar se text não é vazio
        // Criar e salvar um Article Text
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        if (!about){
            throw new Error('About is empty')
        }

        if (!text){
            throw new Error('Text is empty')
        }

        const { name: author } = user;

        const article_text = await this.articleTextsRepository.create({
            about,
            text,
            author,
            user_id
        })

        await this.articleTextsRepository.save(article_text);

        return {article_text, user};
    }
}

export default CreateArticleTextService;
