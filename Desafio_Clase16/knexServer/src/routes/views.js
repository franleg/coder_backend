import db from '../../db/sqlBase.js';
import { Router } from 'express';

const router = Router();

router.get('/', async(req, res) => {
    let products = await db('products').select('*');
    let messages = await db('messages').select('*');
    res.render('home', {
        hasProducts: products.length > 0,
        products,
        messages
    });
})

export default router;