import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import Question from "../models/Piu";
import IQuestionRepository from "../repositories/IPiuRepository";

interface IRequest{
    about:string;
    text:string;
    user_id:string;
}

class CreateQuestionService{
    private questionsRepository: IQuestionRepository;
    private usersRepository: IUserRepository;

    constructor(questionsRepository:IQuestionRepository, usersRepository: IUserRepository) {
        this.questionsRepository = questionsRepository;
        this.usersRepository = usersRepository;
    }

    public async execute({about, text, user_id}:IRequest): Promise <{question:Question, user:User | undefined}> {
        // Verificar se o usuário é válido
        // Verificar se content não é vazio
        // Criar e salvar um Piu
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        if (!text){
            throw new Error('Invalid content')
        }

        const author = await this.usersRepository.findByNameUser(user_id);

        const question = await this.questionsRepository.create({
            about,
            text,
            author,
            user_id,
        })

        await this.questionsRepository.save(question);

        return {question, user};
    }
}

export default CreateQuestionService;
