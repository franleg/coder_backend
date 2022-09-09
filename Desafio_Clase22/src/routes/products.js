import { Router } from 'express';
import { uploader } from '../utils.js';
import faker from 'faker';
import productsService from '../models/Products.js';

const router = Router();

// GET RANDOM PRODUCTS
router.get('/test', async(req, res)=>{
    try{
        let products = [];
        for(let i=0; i<5; i++){
            products.push({
                title: faker.commerce.productName(),
                price: faker.commerce.price(),
                image: faker.image.imageUrl(),
            })
        }
        res.status(200).send(products);

    }catch(error){
        res.status(500).send('Cannot get products');
    }
});

// GET ALL PRODUCTS
router.get('/', async(req, res)=>{
    try{
        let products = await productsService.find();
        res.status(200).send(products);

    }catch(error){
        res.status(500).send('Cannot get products');
    }
});

// GET PRODUCT BY ID
router.get('/:idProduct', async(req,res) => {
    try{
        let id = parseInt(req.params.idProduct);
        let product = await productsService.findById(id)
        let notExist = Object.entries(product).length === 0;
        if(notExist) return res.status(400).send({error:`Product with id ${id} could not be found.`});
        res.status(200).send(product);

    } catch(error){
        res.status(500).send('Cannot get product')
    }
})

// INSERT NEW PRODUCT
router.post('/', uploader.single('filePost'), async(req, res)=>{
    try{
        let newProduct = req.body;
        if(!newProduct.title || !newProduct.price || !req.file) return res.status(400).send({error: "Title, price and thumbnail are required."});
        if(isNaN(newProduct.price)) return res.status(400).send({error:`Price must be numeric.`});
        newProduct.image = req.file.filename;
        await productsService.create(newProduct)
        res.status(200).send(newProduct);

    } catch(error){
        res.status(500).send('Cannot add products')
    }
})

// UPDATE PRODUCT BY ID
router.put('/:idProduct', uploader.single('filePut'), async(req, res)=>{
    try{
        let id = req.params.idProduct;
        let oldProduct = await productsService.findById(id);
        let notExist = Object.entries(oldProduct).length === 0;
        if(notExist) return res.status(400).send({error:`Product with id ${id} could not be found.`});
        let newProduct = req.body;
        if(!newProduct.title || !newProduct.price || !req.file) return res.status(400).send({error: "Title, price and thumbnail are required."});
        newProduct.image = req.file.filename;
        await productsService.findOneAndUpdate({_id:id}, newProduct);
        res.status(200).send({"Product replaced": oldProduct, "New product": newProduct});       

    } catch(error){
        res.status(500).send('Cannot update product')
    }
})

// DELETE PRODUCT BY ID
router.delete('/:idProduct', async(req, res)=>{
    try{
        let id = req.params.idProduct;
        await productsService.deleteById(id);
        let products = await productsService.find();
        res.status(200).send(products);

    } catch(error){
        res.status(500).send('Cannot delete product.')
    }
})

export default router;