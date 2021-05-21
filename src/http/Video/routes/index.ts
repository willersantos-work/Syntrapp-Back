import { Router } from "express";
import multer from 'multer';
import uploadConfig from '../../../config/upload';
import ensureAuthenticated from "../../../shared/middlewares/ensureAutheticated";
import VideosController from "../controller/videosController";

const videosController = new VideosController();

const videosRoutes = Router();
const upload = multer(uploadConfig.multer)

videosRoutes.post('/upload', ensureAuthenticated, upload.single('video'), videosController.create);
videosRoutes.get('/see/:id', videosController.show);

export default videosRoutes;
