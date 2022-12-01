export default class ProductService {
    constructor(dao) {
        this.dao = dao;
    }

    getProducts = async () => {
        return this.dao.getAll();
    }

    getProductById = (id) => {
        return this.dao.getById(id);
    }

    createProduct = (product) => {
        return this.dao.save(product)
    }

    updateProduct = (id, product) => {
        return this.dao.update(id, product);
    }

    deleteProductById = (id) => {
        return this.dao.deleteById(id);
    }
}