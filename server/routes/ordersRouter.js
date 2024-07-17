import express from 'express';
import { createOrderCtrl,
         getAllorderCtrl,
         getSingleorderCtrl,
         updateOrderCtrl,
         getOrderStatsCtrl
        } from '../controllers/orderCtrl.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const orderRouter = express.Router();

orderRouter.post('/', isLoggedIn, createOrderCtrl);
orderRouter.get('/', isLoggedIn, getAllorderCtrl);
orderRouter.put('/update/:id', isLoggedIn, updateOrderCtrl);
orderRouter.get('/:id', isLoggedIn, getSingleorderCtrl);
orderRouter.get('/sales/stats', isLoggedIn, getOrderStatsCtrl);
        
export default orderRouter;