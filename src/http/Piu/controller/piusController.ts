import { Request, Response } from 'express';
import QuestionsRepository from '../../../useCases/Piu/repositories/PiuRepository';
import CreateQuestionService from '../../../useCases/Piu/services/CreatePiuService';
import ShowQuestionService from '../../../useCases/Piu/services/ShowQuestionService';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';

class QuestionsController {
    public async create(request:Request,response:Response){
        const {about, text} = request.body;
        const { id: user_id } = request.user;
        //request para pegar headers de autorização

        const questionsRepository = new QuestionsRepository();
        const usersRepository = new UsersRepository();

        const createQuestion = new CreateQuestionService(questionsRepository, usersRepository);

        const { question, user } = await createQuestion.execute({about, text, user_id});

        return response.json({question, user});
    }

    public async show(request:Request,response:Response){
        const {id:question_id} = request.params;

        const questionsRepository = new QuestionsRepository();
        const showQuestion = new ShowQuestionService(questionsRepository);

        const question = await showQuestion.execute({question_id});

        return response.json({question});
    }
};

export default QuestionsController;
