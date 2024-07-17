import express from 'express';
import upload from '../config/fileUpload.js';
import { 
    createProductCtrl,
    getProductsCtrl,
    getProductCtrl,
    UpdateProductCtrl,
    deleteProductCtrl,
} from '../controllers/productCtrl.js';
import {isLoggedIn} from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

const productsRouter = express.Router();

productsRouter.post('/',isLoggedIn, isAdmin,upload.single('file'),createProductCtrl);
productsRouter.get('/', getProductsCtrl);
productsRouter.get('/:id',getProductCtrl);
productsRouter.put('/:id',isLoggedIn, isAdmin,UpdateProductCtrl);
productsRouter.delete('/:id',isLoggedIn, isAdmin,deleteProductCtrl);

export default productsRouter;