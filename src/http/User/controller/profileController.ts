import { Request, Response } from 'express';
import UsersRepository from '../../../useCases/User/repositories/UserRepository';
import SearchProfileService from '../../../useCases/User/services/SearchProfileService';

class ProfileController {
    public async show(request:Request,response:Response){
        const { id: user_id } = request.user;

        const usersRepository = new UsersRepository();
        const searchProfile = new SearchProfileService(usersRepository);

        const user_with_pius = await searchProfile.execute({ user_id });

        return response.json({user_with_pius});
    }
};

export default ProfileController;
