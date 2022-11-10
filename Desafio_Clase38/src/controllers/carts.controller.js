import { cartsService, productsService } from '../services/index.js';
import nodemailer from 'nodemailer';

const addProductInCart = async (req, res) => {
    let { id, quantity } = req.body;
    quantity = parseInt(quantity);
    let product = await productsService.getProductById(id);
    product.stock -= quantity;
    const user = req.session.user;
    const cartId = user.cart;
    let cart = await cartsService.getPopulatedCart(cartId);
    let exists = cart.products.find(prod => (prod.product._id).toString() === id)
    if(exists) {
        exists.quantity += quantity;
    }
    else {
        cart.products.push({
            product,
            quantity
        });
    }
    let result = await cartsService.updateCart(cartId, cart)
    res.status(200).send({status: 'success', payload: result});
}

const deleteProductInCart = async (req, res) => {
    const user = req.session.user;
    const cartId = user.cart;
    let cart = await cartsService.getPopulatedCart(cartId);
    const productId = req.body.id;
    let product = cart.products.find(prod => prod.id === productId);
    let productIndex = cart.products.indexOf(product);
    cart.products.splice(productIndex, 1);
    await cartsService.updateCart(cartId, cart);
    cart = await cartsService.getPopulatedCart(cartId);
    res.status(200).send({status: 'success', payload: cart});
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user:'legnazzifranco03@gmail.com',
        pass: 'yyzpnfzxqqfncecc'
    }
})

const messageHTML = (cart) => {
    let products = "";
    cart.products.forEach(prod => {
        products += `<div>
                        <hr/>
                        <p>Producto: ${prod.product.title}</p>
                        <p>Precio: $${prod.product.price}</p>
                        <p>Descripción: ${prod.product.description}</p>
                        <p>Cantidad: ${prod.quantity}</p>
                        <hr/>
                    </div>`
    }) 
    return products;
}

const confirmPurchase = async (req, res) => {
    const user = req.session.user;
    const cartId = user.cart;
    let cart = await cartsService.getPopulatedCart(cartId);
    let result = await transporter.sendMail({
        from: 'Yo',
        to: user.email,
        subject: 'Confirmación de compra',
        html: `<div>
                <h1>¡Hola ${user.name}, gracias por tu compra!</h1>
                <h2>Detalle de la orden:</h2>
                ${messageHTML(cart)}
            </div>`
    })
    cart.products = [];
    await cartsService.updateCart(cartId, cart);
    console.log(result);
    res.send({status: 'success', payload: cart.products});
}

export default {
    addProductInCart,
    deleteProductInCart,
    confirmPurchase
}