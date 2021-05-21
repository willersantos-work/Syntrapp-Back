import { Request, Response } from 'express';
import AutenticateUserService from '../../../useCases/User/services/AutenticateUserService';
import UsersRepository from '../../.././useCases/User/repositories/UserRepository';
import HashProvider from '../../.././shared/Providers/HashProvider/HashProvider';

class SectionsController {
    //create para criar um dado
    //index para listar vários dado
    //show para listar um dado
    //update para atualizar um dado
    //delete para deletar um dado
    public async create(request:Request,response:Response){
        //const email = request.body.email;
        //const password = request.body.password;
        const {email, password} = request.body;

        const usersRepository = new UsersRepository();
        const hashProvider = new HashProvider();
        const autenticateUser = new AutenticateUserService(usersRepository, hashProvider);

        const { user, token } = await autenticateUser.execute({ email, password });

        return response.json({user, token});
    }
};

export default SectionsController;
