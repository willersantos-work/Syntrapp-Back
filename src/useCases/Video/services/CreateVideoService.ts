import IStorageProvider from "../../../shared/Providers/StorageProvider/IStorageProvider";
import User from "../../User/models/User";
import IUserRepository from "../../User/repositories/IUserRepository";
import Video from "../models/Video";
import IVideoRepository from "../repositories/IVideoRepository";

interface IRequest{
    about:string;
    filename:string;
    user_id:string;
}

class UploadVideoService{
    private usersRepository: IUserRepository;
    private videosRepository: IVideoRepository;
    private storageProvider: IStorageProvider;

    constructor(usersRepository: IUserRepository, storageProvider: IStorageProvider, videosRepository: IVideoRepository) {
        this.usersRepository = usersRepository;
        this.storageProvider = storageProvider;
        this.videosRepository = videosRepository;
    }

    public async execute({about, filename, user_id}:IRequest): Promise <{ user: User, newVideo: Video }> {
        // Verificar se o usuário está logado
        // Criar e Salvar video

        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            await this.storageProvider.deleteTempFile(filename);
            throw new Error('User not found')
        }

        const {name:author} = user;

        if (!about) {
            await this.storageProvider.deleteFile(filename);
            throw new Error('about is empty')
        }

        await this.storageProvider.saveFile(filename);

        const newVideo = await this.videosRepository.create({
            author,
            video:filename,
            user_id,
            about
        });

        await this.videosRepository.save(newVideo);

        return { user, newVideo };
    }
}

export default UploadVideoService;
