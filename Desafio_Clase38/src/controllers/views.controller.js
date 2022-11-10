import { productsService, cartsService } from '../services/index.js';

const register = (req, res) => {
    res.render('register');
}

const login = (req, res) => {
    res.render('login');
}

const home = async (req, res) => {
    const user = req.session.user;
    const products = await productsService.getProducts();
    res.render(`${user.role}`, {
        user: user,
        hasProducts: products.length > 0,
        products
    });
}

const cart = async (req, res) => {
    let user = req.session.user;
    const cartId = user.cart;
    const cart = await cartsService.getPopulatedCart(cartId);
    let productsInCart = cart.products;
    res.render('cart', {
        user,
        hasProducts: productsInCart.length > 0,
        productsInCart
    });
}

const registerFail = (req, res) => {
    let errorMessage = req.flash('error')[0];
    res.locals.errorMessage = errorMessage;
    res.render('registerfail');
}

const loginFail = (req, res) => {
    let errorMessage = req.flash('error')[0];
    res.locals.errorMessage = errorMessage;
    res.render('loginfail');
}

const logout = (req, res) => {
    const user = req.session.user;
    req.session.destroy(err => {
        if (err) {
          return res.status(400).send({status: 'error', error: 'Unable to log out'});
        } else {
            res.render('logout', user)
        }
      }); 
}

const error404 = (req, res) => {
    res.render('error404');
}

export default {
    register,
    login,
    home,
    cart,
    registerFail,
    loginFail,
    logout,
    error404
}