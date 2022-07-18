import { Router } from 'express';
import { ProductManager } from "../managers/productManager.js";

const router = Router();

const productService = new ProductManager();

const validationParams = (id) => {
    if (isNaN(id)) return res.status(400).send({error: 'Por favor, ingresar un valor númerico.'});
}

router.get('/', async(req, res)=>{
    let productsFile = await productService.getAll();
    let category = req.query.category;
    if(category){
        let productsByCategory = productsFile.filter(prod => prod.category === category);
        if(productsByCategory.length === 0){
            return res.status(400).send(`La categoria ${category} no existe.`);
        }
        return res.status(200).send(productsByCategory);
    }
    res.status(200).send(productsFile);
})

router.get('/:idProduct', async(req,res) => {
    let id = req.params.idProduct;
    validationParams(id);
    productFound = await productService.getById(id);
    res.status(200).send(productFound);
})

router.post('/', async(req, res)=>{
    let newProduct = req.body;
    if (newProduct === {}) return res.status(400).send('No se ha podido añadir el producto.');
    let productAdded = await productService.addProduct(newProduct);
    res.status(200).send(productAdded);
})

router.put('/:idProduct', async(req, res)=>{
    let id = req.params.idProduct;
    validationParams(id);
    let newProduct = req.body;
    let oldProduct = await productService.getById(id);
    let productReplaced = await productService.addProduct(newProduct, oldProduct);
    res.status(200).send(productReplaced);
})

router.delete('/:idProduct', async(req, res)=>{
    let id = req.params.idProduct;
    validationParams(id);
    let productRemoved = await productService.deleteById(id);
    res.status(200).send(productRemoved);
})

export default router;