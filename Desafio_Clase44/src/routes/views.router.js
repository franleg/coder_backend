import { Router } from 'express';
import viewsController from '../controllers/views.controller.js';
import authentication from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authentication.privateValidation, viewsController.home);

router.get('/register', authentication.publicValidation, viewsController.register);

router.get('/login', authentication.publicValidation, viewsController.login);

router.get('/cart', authentication.privateValidation, authentication.userValidation, viewsController.cart);

router.get('/logout', authentication.privateValidation, viewsController.logout);

router.get('/registerfail', viewsController.registerFail);

router.get('/loginfail', viewsController.loginFail);

router.get('/*', viewsController.error404);

export default router;