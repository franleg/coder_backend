import moment from "moment";

export class ProductPresenterDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.thumbnail = product.thumbnail;
    }
}

export class ProductInsertDTO {
    constructor(product) {
        this.title = product.title;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock;
        this.thumbnail = product.thumbnail;
        this.timestamp = moment().format(('DD/MM/YYYY hh:mm:ss'));
        this.code = Math.random().toString(35).substring(3);
    }
}