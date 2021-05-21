import CreateDocumentDTO from "../dtos/CreateDocumentDTO";
import Document from "../models/Document";

interface IDocumentRepository{
    findByDocumentId(document_id:string): Promise<Document | undefined>;
    create(data:CreateDocumentDTO): Promise<Document>;
    save(data:Document): Promise<Document>;
}

export default IDocumentRepository;
