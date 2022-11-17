import UsersDao from '../dao/UsersDao.js';
import CartsDao from '../dao/CartsDao.js';
import ProductDao from '../dao/ProductsDao.js';

import UserService from './UserService.js';
import CartService from './CartService.js';
import ProductService from './ProductService.js';

export const usersService = new UserService(new UsersDao);
export const cartsService = new CartService(new CartsDao);
export const productsService = new ProductService(new ProductDao);