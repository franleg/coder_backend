import { Router } from 'express';
import { uploader } from '../utils.js';
import authentication from '../middlewares/auth.middleware.js';
import passport from 'passport';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

// REGISTER
router.post('/register', uploader.single('avatar'), passport.authenticate('register', {failureRedirect: '/api/sessions/registerfail', failureFlash: true}), sessionsController.register);

// REGISTER FAIL
router.get('/registerfail', sessionsController.registerFail);

// LOGIN
router.post('/login', authentication.authRole, passport.authenticate('login', {failureRedirect: '/api/sessions/loginfail', failureFlash: true}), sessionsController.login);

// LOGIN FAIL
router.get('/loginfail', sessionsController.loginFail);

export default router;