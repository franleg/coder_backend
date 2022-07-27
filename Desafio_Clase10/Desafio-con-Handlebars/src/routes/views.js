import { Router } from 'express';
import { ProductManager } from '../managers/productManager.js';

const router = Router();

const productService = new ProductManager();

// HOME VIEW
router.get('/', (req, res) => {
    res.render('home')
})

// PRODUCTS VIEW
router.get('/products', async(req, res) => {
    let products = await productService.getAll();
    res.render('products', {
        hasProducts: products.length > 0,
        products
    });
})

export default router;