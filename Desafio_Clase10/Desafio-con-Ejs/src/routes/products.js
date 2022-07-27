import { Router } from 'express';
import { ProductManager } from "../managers/productManager.js";
import { uploader } from '../utils.js';

const router = Router();

const productService = new ProductManager();

// GET ALL
router.get('/', async(req, res)=>{
    let productsFile = await productService.getAll();
    res.status(200).send(productsFile);
})

// GET BY ID
router.get('/:idProduct', async(req,res) => {
    let id = req.params.idProduct;
    let productFound = await productService.getById(id);
    if (!productFound) return res.status(400).send({error:`No se ha podido encontrar el producto con id ${id}`})
    res.status(200).send({"Product found": productFound});
})

// POST
router.post('/', uploader.single('filePost'), async(req, res)=>{
    let newProduct = req.body;
    newProduct.image = req.file.filename;
    if (!req.file) return res.status(500).send({error:'No se pudo cargar el archivo.'})
    if (!newProduct.title || !newProduct.price) return res.status(400).send({error: "Por favor, completar todos los campos."});
    let productAdded = await productService.addProduct(newProduct);
    res.status(200).send({"Message": productAdded});
})

// PUT
router.put('/:idProduct', uploader.single('filePut'), async(req, res)=>{
    let id = req.params.idProduct;
    let newProduct = req.body;
    newProduct.image = req.file.filename;
    let oldProduct = await productService.getById(id);
    if(!oldProduct) return res.status(400).send({error: `No se ha podido encontrar el producto con id ${id}`})
    let productReplaced = await productService.addProduct(newProduct, oldProduct);
    res.status(200).send({"Message": productReplaced});
})

// DELETE BY ID
router.delete('/:idProduct', async(req, res)=>{
    let id = req.params.idProduct;
    let productRemoved = await productService.deleteById(id);
    if(!productRemoved) return res.status(400).send({error: `No se ha podido eliminar el producto con id ${id}`})
    res.status(200).send({"Message": productRemoved});
})

export default router;