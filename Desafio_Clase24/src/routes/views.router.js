// TODO ESTO VA EN VIEWS

import { Router } from 'express';

const router = Router();

// HOME VIEW
router.get ('/', (req, res) => {
    let user = req.session.user;
    if (user) {
        res.render('home', user);
    } else {
        res.redirect('/login');
    }
})

// REGISTER VIEW
router.get('/register', (req, res) => {
    res.render('register');
})

// LOGIN VIEW
router.get('/login', (req, res) => {
    res.render('login');
})

// LOGOUT VIEW
router.get('/logout', (req, res) => {
    const user = req.session.user;
    if(!user) return res.redirect('/login');
    req.session.destroy(err => {
        if (err) {
          return res.status(400).send('Unable to log out')
        } else {
            res.render('logout', user)
        }
      }); 
})

export default router;
