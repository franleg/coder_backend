import { Router } from 'express';
import cartsController from '../controllers/carts.controller.js';

const router = Router();

// ADD PRODUCT
router.post('/', cartsController.addProductInCart);

// DELETE PRODUCT
router.delete('/', cartsController.deleteProductInCart);

// CONFIRM PURCHASE
router.get('/confirm', cartsController.confirmPurchase);

export default router;