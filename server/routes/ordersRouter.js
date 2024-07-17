import express from 'express';
import { createOrderCtrl,
         getAllorderCtrl,
         getSingleorderCtrl,
         updateOrderCtrl,
         getSalesSumCtrl
        } from '../controllers/orderCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrderCtrl);
orderRouter.get('/', isLoggedIn, getAllorderCtrl);
orderRouter.put('/update/:id', isLoggedIn, updateOrderCtrl);
orderRouter.get('/:id', isLoggedIn, getSingleorderCtrl);
orderRouter.get('/sales/sum', isLoggedIn, getSalesSumCtrl);
        
export default orderRouter;