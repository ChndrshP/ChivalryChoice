import express from 'express';
import { 
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    UpdateProductCtrl,
    deleteProductCtrl,
} from '../controllers/productCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();

productsRouter.post('/',isLoggedIn,createProductCtrl);
productsRouter.get('/',getProductsCtrl);
productsRouter.get('/:id',getProductCtrl);
productsRouter.put('/:id',isLoggedIn, getProductsCtrl);
productsRouter.delete('/:id/delete',isLoggedIn, deleteProductCtrl);

export default productsRouter;