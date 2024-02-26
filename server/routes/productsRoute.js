import express from 'express';
import { createProductCtrl } from '../controllers/productCtrl.js';

const productsRouter = express.Router();

productsRouter.post('/',createProductCtrl);

export default productsRouter;