import { Router } from 'express';
import UsersController from './controllers/UsersController';
import authMiddleware from './middlewares/auth';

const routes = Router();

routes.post('/register', UsersController.create);
routes.post('/authenticate', UsersController.authenticate);
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.delete('/me/delete',authMiddleware, UsersController.delete);
routes.put('/me/update', authMiddleware, UsersController.update);
routes.get('/me', authMiddleware, UsersController.me);
export default routes;