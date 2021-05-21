import Router from "express";
import ensureAuthenticated from "../../../shared/middlewares/ensureAutheticated";
import SpaceController from "../controller/spaceController";

const spaceController = new SpaceController();

const spaceRoutes = Router();

spaceRoutes.post('/create', ensureAuthenticated, spaceController.create);
spaceRoutes.get('/show', ensureAuthenticated, spaceController.show);
spaceRoutes.put('/edit/:id', ensureAuthenticated, spaceController.edit);

export default spaceRoutes;
