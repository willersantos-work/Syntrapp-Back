import IStorageProvider from "../../../shared/Providers/StorageProvider/IStorageProvider";
import IUserRepository from "../../User/repositories/IUserRepository";
import User from '../models/User';

interface IRequest{
    user_id:string;
    filename: string;
}

class UpdateUserAvatarService{
    private usersRepository: IUserRepository;
    private storageProvider: IStorageProvider;

    constructor(usersRepository: IUserRepository, storageProvider: IStorageProvider) {
        this.usersRepository = usersRepository;
        this.storageProvider = storageProvider;
    }

    public async execute({user_id, filename}:IRequest): Promise <User> {
        // Verificar se o usuário está logado

        const user = await this.usersRepository.findByUserId(user_id);

        if (!user) {
            await this.storageProvider.deleteTempFile(filename);
            throw new Error('User not found')
        }

        if(user.avatar){
            console.log(true)
            await this.storageProvider.deleteFile(user.avatar);
        }

        await this.storageProvider.saveFile(filename);

        user.avatar = filename;

        await this.usersRepository.save(user)

        return user;
    }
}

export default UpdateUserAvatarService;
