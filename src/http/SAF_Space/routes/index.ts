import { Router } from "express";
import ensureAuthenticated from "../../../shared/middlewares/ensureAutheticated";
import SAFSpacesController from "../controller/SAFSpaceController";

const safSpacesController = new SAFSpacesController();

const safSpacesRoutes = Router();

safSpacesRoutes.post('/postar', ensureAuthenticated, safSpacesController.create);
safSpacesRoutes.get('/seeAll', ensureAuthenticated, safSpacesController.index);
safSpacesRoutes.get('/see/:id', ensureAuthenticated, safSpacesController.show);
safSpacesRoutes.put('/edit/:id', ensureAuthenticated, safSpacesController.edit);
safSpacesRoutes.delete('/delete/:id', ensureAuthenticated, safSpacesController.delete);

export default safSpacesRoutes;
