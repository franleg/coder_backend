import { Router } from 'express';
import faker from 'faker';
import productsService from '../models/Products.js';
import messagesService from '../models/Messages.js';

const router = Router();

router.get('/', async(req, res) => {
    let products = await productsService.find();
    let messages = await messagesService.find();
    res.render('home', {
        hasProducts: products.length > 0,
        products,
        messages: messages.map(messages => messages.toJSON())
    });
});

// GET RANDOM PRODUCTS
router.get('/test', async(req, res)=>{
    try{
        let products = [];
        for(let i=0; i<5; i++){
            products.push({
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.random.image(),
            })
        }
        res.render('test', {
            hasProducts: products.length > 0,
            products,
        });

    }catch(error){
        res.status(500).send('Cannot get products');
    }
});

export default router;