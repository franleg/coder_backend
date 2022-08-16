import db from '../../db/sqlBase.js';
import { Router } from 'express';
import { uploader } from '../utils.js';

const router = Router();

// GET ALL PRODUCTS
router.get('/', async(req, res)=>{
    try{
        let products = await db('products').select('*');
        res.status(200).send(products);

    }catch(error) {
        res.status(500).send('Cannot get products')
    }
})

// GET PRODUCT BY ID
router.get('/:idProduct', async(req,res) => {
    try{
        let id = parseInt(req.params.idProduct);
        if(isNaN(id)) return res.status(400).send({error: 'The value must be numeric.'});
        let product = await db('products').where('id', id).select('*');
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
        await db('products').insert(newProduct);
        res.status(200).send(newProduct);

    } catch(error){
        res.status(500).send('Cannot add products')
    }
})

// UPDATE PRODUCT BY ID
router.put('/:idProduct', uploader.single('filePut'), async(req, res)=>{
    try{
        let id = req.params.idProduct;
        if(isNaN(id)) return res.status(400).send({error: 'The value must be numeric.'});
        let oldProduct = await db('products').where('id', id).select('*');
        let notExist = Object.entries(oldProduct).length === 0;
        if(notExist) return res.status(400).send({error:`Product with id ${id} could not be found.`});
        let newProduct = req.body;
        if(!newProduct.title || !newProduct.price || !req.file) return res.status(400).send({error: "Title, price and thumbnail are required."});
        newProduct.image = req.file.filename;
        await db('products').where('id', id).update({title: newProduct.title, price: newProduct.price, image: newProduct.image});
        res.status(200).send({"Product replaced": oldProduct, "New product": newProduct});       

    } catch(error){
        res.status(500).send('Cannot update product')
    }
})

// DELETE PRODUCT BY ID
router.delete('/:idProduct', async(req, res)=>{
    try{
        let id = req.params.idProduct;
        if(isNaN(id)) return res.status(400).send({error: 'The value must be numeric.'});
        await db('products').where('id', id).del();
        let products = await db('products').select('*')
        res.status(200).send(products);

    } catch(error){
        res.status(500).send('Cannot delete product.')
    }
})

export default router;