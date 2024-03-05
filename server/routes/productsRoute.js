import express from 'express';
import { 
    createProductCtrl,
    getProductCtrl,
    getSingleProduct,
    UpdateProductCtrl,
} from '../controllers/productCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();

productsRouter.post('/',isLoggedIn,createProductCtrl);
productsRouter.get('/',getProductCtrl);
productsRouter.get('/:id',getProductCtrl);
productsRouter.put('/:id',isLoggedIn, getProductCtrl);

export default productsRouter;