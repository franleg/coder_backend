import mongoose from 'mongoose';
import { productsService } from '../services/index.js';
import { ProductInsertDTO } from '../DTOs/productDTO.js';

const createProduct = async (req, res) => {
    const { title, price, description, stock } = req.body;
    if(!title || !price || !description || !stock) return res.status(400).send({status: 'error', error: 'Valores incompletos'});
    if(!req.file) return res.status(400).send({status: 'error', error:'Error al cargar la imagen'});
    if(isNaN(price)) return res.status(400).send({status: 'error', error: 'El precio debe ser numérico'});
    if(isNaN(stock)) return res.status(400).send({status: 'error', error:'El stock debe ser numérico'});
    const newProduct = {
        title,
        price,
        description,
        stock,
        thumbnail: req.file.filename,
    }
    const insertProduct = new ProductInsertDTO(newProduct);
    let result = await productsService.createProduct(insertProduct);
    res.status(200).send({status: 'success', payload: result});
}

const getProducts = async (req, res) => {
    let products = await productsService.getProducts();
    if(products.length === 0) return res.status(404).send({status: 'error', error: 'No se han encontrado productos disponibles'});
    res.status(200).send({status: 'succes', payload: products});
}

const getProductById = async (req, res) => {
    let id = req.params.idProduct;
    if(!id) return res.status(400).send({error: 'El id del producto es requerido'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({status: 'error', error: `Formato de id incorrecto`});
    let result = await productsService.getProductById(id);
    if(!result) return res.status(404).send({status: 'error', error: `No se ha encontrado el producto con id ${id}`});
    res.status(200).send({status: 'success', payload: result});  
}

const deleteProduct = async (req, res) => {
    let id = req.params.idProduct;
    if(!id) return res.status(400).send({error: 'El id del producto es requerido'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({status: 'error', error: `Formato de id incorrecto`});
    let product = await productsService.getProductById(id);
    if(!product) return res.status(404).send({status: 'error', error: `No se ha encontrado el producto con id ${id}`});
    await productsService.deleteProductById(id);
    let products = await productsService.getProducts();
    res.status(200).send({status: 'success', payload: products});
}

const updateProduct = async (req,res) => {
    let id = req.params.idProduct;
    if(!id) return res.status(400).send({error: 'El id del producto es requerido'});
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({status: 'error', error: `Formato de id incorrecto`});
    let oldProduct = await productsService.getProductById(id);
    if(!oldProduct) return res.status(404).send({status: 'error', error: `No se ha encontrado el producto con id ${id}`});
    const { title, price, description, stock } = req.body;
    if(!title || !price || !description) return res.status(400).send({status: 'error', error: 'Valores incompletos'});
    if(!req.file) return res.status(400).send({status: 'error', error:'Error al cargar la imagen'});
    if(isNaN(price)) return res.status(400).send({status: 'error', error:`El precio debe ser numérico`});
    if(isNaN(stock)) return res.status(400).send({status: 'error', error:`El stock debe ser numérico`});
    let products = await productsService.getProducts();
    let productExist = products.find(prod => prod.title == title);
    if(productExist) return res.status(400).send({status: 'error', error: `El producto ${title} ya existe`});
    const newProduct = {
        title,
        price,
        description,
        thumbnail: req.file.filename,
    }
    const insertProduct = new ProductInsertDTO(newProduct);
    await productsService.updateProduct(oldProduct._id, insertProduct);
    let productsUpdated = await productsService.getProducts();
    res.status(200).send({status: 'succes', payload: productsUpdated});
}

export default {
    createProduct,
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct
}