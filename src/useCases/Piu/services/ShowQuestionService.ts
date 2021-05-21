import Question from "../models/Piu";
import IQuestionRepository from "../repositories/IPiuRepository";

interface IRequest{
    question_id:string;
}

class ShowQuestionService{
    private questionsRepository: IQuestionRepository;

    constructor(questionsRepository:IQuestionRepository) {
        this.questionsRepository = questionsRepository;
    }

    public async execute({question_id}:IRequest): Promise <Question> {
        // Retornar as questions com as answers

        const question = await this.questionsRepository.findByIdWithAnswers(question_id);

        return question;
    }
}

export default ShowQuestionService;
