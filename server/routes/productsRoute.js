import express from 'express';
import { 
    createProductCtrl,
    getProductCtrl,
    getSingleProduct,
} from '../controllers/productCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';

const productsRouter = express.Router();

productsRouter.post('/',isLoggedIn,createProductCtrl);
productsRouter.get('/',createProductCtrl);
productsRouter.get('/:id',getSingleProduct);

export default productsRouter;