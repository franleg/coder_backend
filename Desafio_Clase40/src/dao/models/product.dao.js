import mongoose from 'mongoose';

const collection = 'Products';

const schema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    stock: Number,
    thumbnail: String,
    timestamp: String,
    code: String,
})

const productsModel = mongoose.model(collection, schema);

export default productsModel;