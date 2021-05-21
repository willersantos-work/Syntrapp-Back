import { Request, Response } from 'express';
import CreateUserService from '../../.././useCases/User/services/CreateUserService';
import UsersRepository from '../../.././useCases/User/repositories/UserRepository';
import HashProvider from '../../.././shared/Providers/HashProvider/HashProvider';
import EditUserService from '../../../useCases/User/services/EditUserSevice';
import EditUserPasswordService from '../../../useCases/User/services/EditUserPasswordSevice';
import EditUserPhoneNumberService from '../../../useCases/User/services/EditUserPhoneNumberSevice';
import PatternPlantRepository from '../../../useCases/Pattern_Plant/repositories/PatternPlantRepository';

class UsersController {
    //create para criar um dado
    //index para listar vários dado
    //show para listar um dado
    //update para atualizar um dado
    //delete para deletar um dado
    public async create(request:Request,response:Response){
        const { name, CPF, password, email, phone_number } = request.body;
        //const CPF = request.body.CPF;
        //const password = request.body.password;
        //const email = request.body.email;
        //const phone_number = request.body.phone_number;

        const usersRepository = new UsersRepository();
        const hashProvider = new HashProvider();
        const patternPlantsRepository = new PatternPlantRepository();

        const createUser = new CreateUserService(usersRepository, hashProvider, patternPlantsRepository);

        const {user, token, patternPlantsSetup} = await createUser.execute({ name, email, CPF, password, phone_number });

        return response.json({user, token, patternPlantsSetup});
    }

    public async edit(request:Request,response:Response) {
        const { id: user_id } = request.user;
        const { name } = request.body;
        //const id = resquest.params;
        const usersRepository = new UsersRepository();

        const editUser = new EditUserService(usersRepository);

        const newUser = await editUser.execute({ user_id, name });

        return response.json({newUser});
    }

    public async editPhoneNumber(request:Request,response:Response) {
        const { id: user_id } = request.user;
        const { phone_number } = request.body;
        //const id = resquest.params;
        const usersRepository = new UsersRepository();

        const editUserPhone = new EditUserPhoneNumberService(usersRepository);

        const newUser = await editUserPhone.execute({ user_id, phone_number });

        return response.json({newUser});
    }

    public async editPassword(request:Request,response:Response) {
        const { id: user_id } = request.user;
        const { password, confirm_password, old_password } = request.body;

        const usersRepository = new UsersRepository();
        const hashProvider = new HashProvider();

        const editUserPassword = new EditUserPasswordService(usersRepository, hashProvider);

        const newUser = await editUserPassword.execute({ user_id, password, confirm_password, old_password });

        return response.json({newUser});
    }
};

export default UsersController;
