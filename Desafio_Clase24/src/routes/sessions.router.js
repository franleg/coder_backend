import { Router } from 'express';
import usersService from '../models/User.js';
import { createHash, isValidPassword } from '../utils.js';

const router = Router();

// REGISTER USER
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name, !email, !password) return res.status(400).send({status: 'error', error: 'Incomplete values'});
    const exists = await usersService.findOne({email: email});
    if (exists) return res.status(400).send({status: 'error', error: 'User already exists'});
    const newUser = {
        name,
        email,
        password: createHash(password),
    };
    let result = await usersService.create(newUser);
    res.status(200).send(result);
});


// LOGIN USER
router.post ('/login', async (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send({status: 'error', error: 'Incomplete values'});
    let user = await usersService.findOne({email: email});
    if (!user) return res.status(400).send({status: 'error', error: 'Incorrect credentials'});
    if(!isValidPassword(user, password)) return res.status(400).send({status: 'error', error: 'Incorrect password'})
    req.session.user = {
        id: user._id,
        name: user.name,
        email: user, email
    }
    res.status(200).send({status: 'sucess', payload: req.session.user});
})

export default router;
