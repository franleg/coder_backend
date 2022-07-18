const ProductManager = require('./managers/productManager.js');

const productService = new ProductManager();

const process = async () => {
    // GET PRODUCTS
    console.log("Products on file: ");
    let productsOnFile = await productService.getAll();
    console.log(productsOnFile);

    // ADD A PRODUCT
    console.log("Producto agregado: ");
    let productAdded = {
        marca: "Yamaha",
        modelo: "Hs5",
        categoria: "monitores de estudio",
    };
    await productService.save(productAdded);
    console.log(productAdded);

    // GET A PRODUCT BY ID
    console.log("Product found: ");
    let productFound = await productService.getById(1);
    console.log(productFound);

    // DELETE A PRODUCT BY ID
    console.log("Product removed: ")
    let productRemoved = await productService.deleteById(1);
    console.log(productRemoved);

    // DELETE ALL PRODUCTS
    let allProductsDeleted = await productService.deleteAll();
    console.log(allProductsDeleted) 

}

process();