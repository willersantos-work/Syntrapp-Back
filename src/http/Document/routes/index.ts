import { Router } from "express";
import ensureAuthenticated from "../../../shared/middlewares/ensureAutheticated";

const documentsController = new DocumentsController();

const documentsRoutes = Router();

documentsRoutes.post('/upload', ensureAuthenticated, documentsController.create);
documentsRoutes.get('/show/:id', ensureAuthenticated, documentsController.show);
documentsRoutes.get('/showAllDocuments/:task_id', ensureAuthenticated, documentsController.index);
documentsRoutes.delete('/show/:id', ensureAuthenticated, documentsController.delete);

export default documentsRoutes;
