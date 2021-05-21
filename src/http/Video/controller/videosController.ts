import { Request, Response } from 'express';
import StorageProvider from '../../../shared/Providers/StorageProvider/StorageProvider';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';
import VideosRepository from '../../../useCases/Video/repositories/VideoRepository';
import UploadVideoService from '../../../useCases/Video/services/CreateVideoService';
import SeeVideoService from '../../../useCases/Video/services/SeeVideoService';

class VideosController {
    public async create(request:Request,response:Response) {
        const { id: user_id } = request.user;
        const { filename } = request.file;
        const { about } = request.body;

        const storageProvider = new StorageProvider();
        const usersRepository = new UsersRepository();
        const videosRepository = new VideosRepository();

        const uploadVideo = new UploadVideoService(usersRepository, storageProvider, videosRepository);

        const { user, newVideo } = await uploadVideo.execute({ user_id, about, filename });

        return response.json({ user, newVideo });

    }

    public async show(request:Request,response:Response) {
        const {id:video_id} = request.params;

        const videosRepository = new VideosRepository();

        const seeVideo = new SeeVideoService(videosRepository);

        const { video } = await seeVideo.execute({video_id});

        return response.json({video});
    }
};

export default VideosController;
