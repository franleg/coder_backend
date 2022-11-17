import config from '../config/config.js';

// MIDDLEWARE OF ROLE AUTENTICATION
const authRole = (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (email !== config.admin.EMAIL && password !== config.admin.PASSWORD) next()
        else {
            if (!email || !password) return res.send({status: 'error', error: 'Valores incompletos'});
            if (password !== config.admin.PASSWORD) return res.send({status: 'error', error: 'Contraseña incorrecta'});
            req.session.user = {
                name: 'Admin',
                role: 'admin',
                id: '0'
            }
            return res.send({status: 'success', payload: req.session.user});
        }        
    } catch (error) {
        console.log(error);
    }
};

// MIDDLEWARE OF PUBLIC VALIDATION
const publicValidation = (req, res, next) => {
    try {
        const user = req.session.user;
        if(user) return res.redirect('/');
        else next();
    } catch (error) {
        console.log(error);
    }
}

// MIDDLEWARE OF PRIVATE VALIDATION 
const privateValidation = async (req, res, next) => {
    try {
        const user = req.session.user;
        if(!user) return res.redirect('/login');
        next();
    } catch (error) {
        console.log(error);
    }
}

// MIDDLEWARE OF USER VALIDATION
const userValidation = async (req, res, next) => {
    const user = req.session.user;
    if (user.role !== 'user') return res.redirect('/')
    next();
}

export default { 
    authRole,
    publicValidation,
    privateValidation,
    userValidation
};