import passport from 'passport';
import local from 'passport-local';
import usersService from '../models/User.js';
import { createHash, isValidPassword } from '../utils.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {

    // REGISTER STRATEGY
    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField: 'email'}, async (req, email, password, done) => {
        try {
            const { name } = req.body;
            if (!name, !email, !password) return done(null, false, {message: 'Campos incompletos'});
            const exists = await usersService.findOne({email: email});
            if (exists) return done(null, false, {message: 'El usuario ya existe'});
            const newUser = {
                name,
                email,
                password: createHash(password),
            };
            let result = await usersService.create(newUser);
            return done(null, result);
        } catch (error) {
            done(error);
        }
    }));

    // LOGIN STRATEGY
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
        try {
            if (!email || !password) return done(null, false, {message: 'Campos incompletos'});
            let user = await usersService.findOne({email: email});
            if (!user) return done(null, false, {message: 'Credenciales incorrectas'});
            if(!isValidPassword(user, password)) return done(null, false, {message: 'Contraseña incorrecta'});
            return done(null, user);
        } catch (error) {
            done(error);
        }
    }))

    // SERIALIZATION
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // DESERIALIZATION
    passport.deserializeUser(async (id, done) => {
        let result = await usersService.findOne({_id: id});
        return done(null, result);
    })
}

export default initializePassport;