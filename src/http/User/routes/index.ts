import Router from 'express';
import ensureAuthenticated from '../../../shared/middlewares/ensureAutheticated';
import UsersController from '.././controller/usersController';
import AvatarController from '../controller/avatarController';
import ProfileController from '../controller/profileController';
import SectionsController from '../controller/sectionsController';

import multer from 'multer';
import uploadConfig from '../../../config/upload';

const sectionsController = new SectionsController();
const usersController = new UsersController();
const profileController = new ProfileController();
const avatarController = new AvatarController();

const userRoutes = Router();
const upload = multer(uploadConfig.multer)

// Faço todas minhas requisições no routes
// na qual posso fazer get, post, put, patch, delete

userRoutes.post('/login', sectionsController.create);
userRoutes.post('/register', usersController.create);
userRoutes.get('/profile', ensureAuthenticated, profileController.show)
userRoutes.patch('/editUser', ensureAuthenticated, usersController.edit)
userRoutes.patch('/editPhoneNumber', ensureAuthenticated, usersController.editPhoneNumber)
userRoutes.patch('/editPassword', ensureAuthenticated, usersController.editPassword)
userRoutes.patch('/editAvatar', ensureAuthenticated, upload.single('avatar'), avatarController.edit)
//Patch para editar somente um campo de informação
//Put para editar vários campos de informação

//userRoutes.get('/visualizar', profileController.index);

//userRoutes.put('/username?', (request, response) => console.log("Estou na rota de User (PUT)"));

export default userRoutes;
