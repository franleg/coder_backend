import { Router } from 'express';
import { uploader } from '../utils.js';
import productsController from '../controllers/products.controller.js';

const router = Router();

// ADD PRODUCT
router.post('/', uploader.single('thumbnail'), productsController.createProduct);

// GET ALL PRODUCTS
router.get('/', productsController.getProducts);

// GET PRODUCT BY ID
router.get('/:idProduct', productsController.getProductById);

// DELETE PRODUCT BY ID
router.delete('/:idProduct', productsController.deleteProduct);

// UPDATE PRODUCT
router.put('/:idProduct', uploader.single('thumbnail'), productsController.updateProduct);

export default router;