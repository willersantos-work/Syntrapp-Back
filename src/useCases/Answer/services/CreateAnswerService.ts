import Question from "../../Piu/models/Piu";
import IQuestionRepository from "../../Piu/repositories/IPiuRepository";
import IUserRepository from "../../User/repositories/IUserRepository";
import Answer from "../models/Answer";
import IAnswerRepository from "../repositories/IAnswerRepository";

interface IRequest{
    question_id:string;
    answer_text:string;
    user_id:string;
}

class CreateAnswerService{
    private answersRepository: IAnswerRepository;
    private usersRepository: IUserRepository;
    private questionsRepository: IQuestionRepository;

    constructor(answersRepository:IAnswerRepository, usersRepository: IUserRepository, questionsRepository: IQuestionRepository) {
        this.answersRepository = answersRepository;
        this.usersRepository = usersRepository;
        this.questionsRepository = questionsRepository;
    }

    public async execute({question_id, answer_text, user_id}:IRequest): Promise <{answer:Answer, question:Question}> {
        // Verificar se o usuário é válido
        // Verificar se answer_text não é vazio
        // Verificar se question_id é válido
        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            throw new Error('User not found')
        }

        if (!answer_text){
            throw new Error('Answer Text is empty')
        }

        const question = await this.questionsRepository.findById(question_id);

        const author = await this.usersRepository.findByNameUser(user_id);

        const answer = await this.answersRepository.create({
            question_id,
            answer_text,
            author,
            user_id
        })

        await this.answersRepository.save(answer);

        return {answer, question};
    }
}

export default CreateAnswerService;
