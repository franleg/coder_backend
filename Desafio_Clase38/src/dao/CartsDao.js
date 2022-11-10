import cartsModel from './models/cart.dao.js';

export default class CartsDao {

    getById = (id) => {
        return cartsModel.findOne({id: id}).lean();
    }

    getByIdAndPopulate = (id) => {
        return cartsModel.findOne({id: id}).lean().populate('products.product');
    }

    save = () => {
        return cartsModel.create({products:[]});
    }

    update = (id, cart) => {
        return cartsModel.findByIdAndUpdate(id, {$set: {products: cart.products}});
    }
}