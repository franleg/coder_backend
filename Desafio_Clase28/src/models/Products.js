import mongoose from 'mongoose';

const collection = 'products';

const productsSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
});

const productsService = mongoose.model(collection, productsSchema);

export default productsService;