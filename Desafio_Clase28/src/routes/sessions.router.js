import { Router } from 'express';
import passport from 'passport';

const router = Router();

// REGISTER USER
router.post('/register', passport.authenticate('register', {failureRedirect: '/api/sessions/registerfail', failureFlash: true}), async (req, res) => {
    console.log(req.user);
    res.status(200).send({status: 'sucess', payload: req.user});
});

// REGISTER FAIL
router.get('/registerfail', (req, res) => {
    res.status(500).send({status: 'error', error: 'Error in register'});
})

// LOGIN USER
router.post ('/login', passport.authenticate('login', {failureRedirect: '/api/sessions/loginfail', failureFlash: true}), async (req,res) => {
    req.session.user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).send({status: 'sucess', payload: req.session.user});
})

// LOGIN FAIL
router.get('/loginfail', (req, res) => {
    res.status(500).send({status: 'error', error: 'Error in login'});
})

export default router;
