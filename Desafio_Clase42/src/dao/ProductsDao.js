import productsModel from './models/product.dao.js';

export default class Product {

    getAll = () => {
        return productsModel.find().lean();
    }

    getById = (id) => {
        return productsModel.findById({_id: id}).lean();
    }

    save = (product) => {
        return productsModel.create(product);
    }

    update = (id, product) => {
        return productsModel.findByIdAndUpdate(id, {$set: product});
    }

    deleteById = (id) => {
        return productsModel.deleteOne({_id: id});
    }
}
