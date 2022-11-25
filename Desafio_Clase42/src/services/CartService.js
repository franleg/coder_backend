export default class CartService {
    constructor(dao) {
        this.dao = dao;
    }

    createCart = () => {
        return this.dao.save();
    }

    getCartById = (id) => {
        return this.dao.getById(id);
    }

    getPopulatedCart = (id) => {
        return this.dao.getByIdAndPopulate(id);
    }

    updateCart = (id, cart) => {
        return this.dao.update(id, cart);
    }
}