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
    let category = req.query.category;
    if(category){
        let productsByCategory = products.filter(prod => prod.category === category);
        if(productsByCategory.length === 0){
            return res.render('products', `La categoria ${category} no existe.`);
        }
        return res.render('products', {
            productsByCategory
        });
    }
    res.render('products', {
        hasProducts: products.length > 0,
        products
    });
})

export default router;