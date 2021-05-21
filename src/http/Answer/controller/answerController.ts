import { Request, Response } from 'express';
import AnswerRepository from '../../../useCases/Answer/repositories/AnswerRepository';
import CreateAnswerService from '../../../useCases/Answer/services/CreateAnswerService';
import QuestionsRepository from '../../../useCases/Piu/repositories/PiuRepository';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

class AnswerController {
    public async create(request:Request,response:Response){
        const {question_id, answer_text} = request.body;
        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();
        const answersRepository = new AnswerRepository();
        const questionsRepository = new QuestionsRepository();

        const createAnswer = new CreateAnswerService(answersRepository, usersRepository, questionsRepository);

        const {answer, question} = await createAnswer.execute({question_id, answer_text, user_id});

        return response.json({answer, question});
    }
};

export default AnswerController;
