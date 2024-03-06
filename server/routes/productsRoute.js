import express from 'express';
import { 
    createProductCtrl,
    getProductCtrl,
    getSingleProduct,
    UpdateProductCtrl,
    deleteProductCtrl,
} from '../controllers/productCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();

productsRouter.post('/',isLoggedIn,createProductCtrl);
productsRouter.get('/',getProductCtrl);
productsRouter.get('/:id',getProductCtrl);
productsRouter.put('/:id',isLoggedIn, getProductCtrl);
productsRouter.delete('/:id/delete',isLoggedIn, deleteProductCtrl);

export default productsRouter;