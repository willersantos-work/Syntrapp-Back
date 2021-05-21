import { getRepository, Repository } from "typeorm";
import CreateAnswerDTO from "../dtos/CreateAnswerDTO";
import Answer from "../models/Answer";
import IAnswerRepository from "./IAnswerRepository";

class AnswerRepository implements IAnswerRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Answer>;

    constructor() {
        this.ormRepository = getRepository(Answer);
    }

    public async create(data:CreateAnswerDTO): Promise<Answer> {
        const answer = this.ormRepository.create(data);

        return answer;
    }

    public async save(data:Answer): Promise<Answer> {
        const answer = await this.ormRepository.save(data)

        return answer;
    }
}

export default AnswerRepository;
