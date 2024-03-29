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

// REGISTER FAIL
router.get('/registerfail', (req, res) => {
    let errorMessage = req.flash('error')[0];
    res.locals.errorMessage = errorMessage;
    res.render('registerfail');
})

// LOGIN VIEW
router.get('/login', (req, res) => {
    res.render('login');
})

// LOGIN FAIL
router.get('/loginfail', (req, res) => {
    let errorMessage = req.flash('error')[0];
    res.locals.errorMessage = errorMessage;
    res.render('loginfail');
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
