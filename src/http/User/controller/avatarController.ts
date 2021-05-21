import { Request, Response } from 'express';
import StorageProvider from '../../../shared/Providers/StorageProvider/StorageProvider';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';
import UpdateUserAvatarService from '../../../useCases/User/services/UpdateUserAvatar';

//Editar imagem do profile
class AvatarController {
    public async edit(request:Request,response:Response) {
        const { id: user_id } = request.user;
        const { filename } = request.file;

        const storageProvider = new StorageProvider();
        const usersRepository = new UsersRepository();

        const updateUserAvatar = new UpdateUserAvatarService(usersRepository, storageProvider);

        const user = await updateUserAvatar.execute({ user_id, filename });

        return response.json({ filename, user });
    }
};

export default AvatarController;
