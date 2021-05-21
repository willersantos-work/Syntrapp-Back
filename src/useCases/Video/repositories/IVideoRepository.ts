import CreateVideoDTO from "../dtos/CreateVideoDTO";
import Video from "../models/Video";

interface IVideoRepository{
    create(data:CreateVideoDTO): Promise<Video>;
    save(data:Video): Promise<Video>;
    seeAll(): Promise<Video[]>;
    seeOne(video_id: string): Promise<Video | undefined>;
}

export default IVideoRepository;
