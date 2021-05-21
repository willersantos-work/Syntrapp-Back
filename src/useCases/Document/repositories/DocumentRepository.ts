import { getRepository, Repository } from "typeorm";
import CreateDocumentDTO from "../dtos/CreateDocumentDTO";
import IDocumentRepository from "./IDocumentRepository";
import Document from "../models/Document";

class DocumentsRepository implements IDocumentRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Document>;

    constructor() {
        this.ormRepository = getRepository(Document);
    }

    public async create(data: CreateDocumentDTO): Promise<Document> {
        const document = this.ormRepository.create(data);

        return document;
    }

    public async save(data: Document): Promise<Document> {
        const document = await this.ormRepository.save(data)

        return document;
    }

    public async findByDocumentId(document_id:string): Promise<Document | undefined> {
        const document = await this.ormRepository.findOne({
            where: {id:document_id},
        })

        return document;
    }
}

export default DocumentsRepository;
