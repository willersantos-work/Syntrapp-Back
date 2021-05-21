import Video from "../models/Video";
import IVideoRepository from "../repositories/IVideoRepository";

interface IRequest{
    video_id:string;
}

class SeeVideoService{
    private videosRepository: IVideoRepository;

    constructor(videosRepository: IVideoRepository) {
        this.videosRepository = videosRepository;
    }

    public async execute({video_id}:IRequest): Promise <{ video: Video }> {
        // Encontrar video
        // Retornar video

        const video = await this.videosRepository.seeOne(video_id);

        if (!video) {
            throw new Error('Video not found')
        }

        return { video };
    }
}

export default SeeVideoService;
