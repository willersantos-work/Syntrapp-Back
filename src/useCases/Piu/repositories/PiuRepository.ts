import { getRepository, Repository } from 'typeorm';
import CreateQuestionDTO from '../dtos/CreatePiuDTO';
import Question from '../models/Piu';
import IQuestionRepository from './IPiuRepository';

class QuestionsRepository implements IQuestionRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Question>;

    constructor() {
        this.ormRepository = getRepository(Question);
    }

    public async create(data: CreateQuestionDTO): Promise<Question> {
        const question = this.ormRepository.create(data);

        return question;
    }

    public async save(data: Question): Promise<Question> {
        const question = await this.ormRepository.save(data)

        return question;
    }

    public async findByIdWithAnswers(question_id:string): Promise<Question> {
        const question = await this.ormRepository.findOneOrFail({
            where: {id: question_id},
            relations: ['answers'],
        });

        return question;
    }

    public async findById(question_id:string): Promise<Question> {
        const question = await this.ormRepository.findOneOrFail({
            where: {id:question_id}
        });

        return question;
    }
}

export default QuestionsRepository;
