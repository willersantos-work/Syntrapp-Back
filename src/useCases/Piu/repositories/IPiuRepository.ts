import Answer from "../../Answer/models/Answer";
import CreateQuestionDTO from "../dtos/CreatePiuDTO";
import Question from "../models/Piu";

interface IQuestionRepository{
    create(data:CreateQuestionDTO): Promise<Question>;
    save(data:Question): Promise<Question>;
    findById(question_id:string): Promise<Question>;
    findByIdWithAnswers(question_id:string): Promise<Question>;
}

export default IQuestionRepository;
