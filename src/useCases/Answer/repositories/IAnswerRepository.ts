import CreateAnswerDTO from "../dtos/CreateAnswerDTO";
import Answer from "../models/Answer";

interface IAnswerRepository{
    create(data:CreateAnswerDTO): Promise<Answer>;
    save(data:Answer): Promise<Answer>;
}

export default IAnswerRepository;
