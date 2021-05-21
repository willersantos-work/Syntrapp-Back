import { getRepository, Repository } from "typeorm";
import CreateVideoDTO from "../dtos/CreateVideoDTO";
import Video from "../models/Video";
import IVideoRepository from "./IVideoRepository";

class VideosRepository implements IVideoRepository{
    //Os dois primeiros blocos foram para criação do repositório no typeorm
    private ormRepository: Repository<Video>;

    constructor() {
        this.ormRepository = getRepository(Video);
    }

    public async create(data:CreateVideoDTO): Promise<Video> {
        const video = this.ormRepository.create(data);

        return video;
    }

    public async save(data:Video): Promise<Video> {
        const videos = await this.ormRepository.save(data)

        return videos;
    }

    public async seeAll(): Promise<Video[]> {
        const video = await this.ormRepository.find({
            select: (['id', 'author', 'about', 'video', 'created_at']),
            order: {created_at:"DESC"}
        })

        return video;
    }

    public async seeOne(video_id: string): Promise<Video | undefined> {
        const video = await this.ormRepository.findOne({
            where: {id: video_id}
        })

        return video;
    }
}

export default VideosRepository;
